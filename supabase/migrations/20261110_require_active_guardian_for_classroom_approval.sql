-- Ensure a teacher cannot grant guardian consent by editing classroom_members.
-- Guardian approval must be backed by an active guardian_relationships row.
ALTER POLICY "Approved classroom teachers update membership status"
ON public.classroom_members
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.classrooms c
    JOIN public.teacher_profiles tp ON tp.user_id = c.teacher_id
    WHERE c.id = classroom_members.classroom_id
      AND c.teacher_id = (SELECT auth.uid())
      AND tp.approved = true
  )
  AND (
    classroom_members.membership_status <> 'approved'
    OR classroom_members.parent_consent_status = 'approved'
  )
  AND (
    classroom_members.parent_consent_status <> 'approved'
    OR EXISTS (
      SELECT 1
      FROM public.guardian_relationships gr
      WHERE gr.student_id = classroom_members.user_id
        AND gr.relationship_status = 'active'
    )
  )
);
