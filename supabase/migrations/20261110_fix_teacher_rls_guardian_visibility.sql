-- Teacher RLS policies must not depend on reading guardian_relationships.
-- That table intentionally exposes rows only to the linked student/guardian.
-- The parent_consent_status column is not updateable by authenticated clients;
-- it is set/revoked only by the guardian-consent SECURITY DEFINER RPC.
-- Teacher access can therefore safely rely on approved membership + protected
-- consent status, while student/guardian paths retain their own link checks.

ALTER POLICY "Students guardians and classroom teachers read submissions"
ON public.homework_submissions
USING (
  student_id = (SELECT auth.uid())
  OR EXISTS (
    SELECT 1
    FROM public.guardian_relationships gr
    WHERE gr.student_id = homework_submissions.student_id
      AND gr.guardian_id = (SELECT auth.uid())
      AND gr.relationship_status = 'active'
  )
  OR EXISTS (
    SELECT 1
    FROM public.homework_assignments ha
    JOIN public.teacher_profiles tp ON tp.user_id = ha.teacher_id
    JOIN public.classroom_members cm ON cm.classroom_id = ha.classroom_id
    WHERE ha.id = homework_submissions.assignment_id
      AND cm.user_id = homework_submissions.student_id
      AND cm.membership_status = 'approved'
      AND cm.parent_consent_status = 'approved'
      AND ha.teacher_id = (SELECT auth.uid())
      AND tp.approved = true
  )
);

ALTER POLICY "Approved classroom teachers mark submissions"
ON public.homework_submissions
USING (
  EXISTS (
    SELECT 1
    FROM public.homework_assignments ha
    JOIN public.teacher_profiles tp ON tp.user_id = ha.teacher_id
    JOIN public.classroom_members cm ON cm.classroom_id = ha.classroom_id
    WHERE ha.id = homework_submissions.assignment_id
      AND cm.user_id = homework_submissions.student_id
      AND cm.membership_status = 'approved'
      AND cm.parent_consent_status = 'approved'
      AND ha.teacher_id = (SELECT auth.uid())
      AND tp.approved = true
  )
)
WITH CHECK (
  marked_by = (SELECT auth.uid())
  AND (
    score IS NULL
    OR score <= (
      SELECT ha.max_points
      FROM public.homework_assignments ha
      WHERE ha.id = homework_submissions.assignment_id
    )
  )
  AND EXISTS (
    SELECT 1
    FROM public.homework_assignments ha
    JOIN public.teacher_profiles tp ON tp.user_id = ha.teacher_id
    JOIN public.classroom_members cm ON cm.classroom_id = ha.classroom_id
    WHERE ha.id = homework_submissions.assignment_id
      AND cm.user_id = homework_submissions.student_id
      AND cm.membership_status = 'approved'
      AND cm.parent_consent_status = 'approved'
      AND ha.teacher_id = (SELECT auth.uid())
      AND tp.approved = true
  )
);

ALTER POLICY "Approved classroom teachers read consented student progress"
ON public.student_learning_progress
USING (
  EXISTS (
    SELECT 1
    FROM public.classroom_members cm
    JOIN public.classrooms c ON c.id = cm.classroom_id
    JOIN public.teacher_profiles tp ON tp.user_id = c.teacher_id
    WHERE cm.user_id = student_learning_progress.student_id
      AND cm.membership_status = 'approved'
      AND cm.parent_consent_status = 'approved'
      AND c.teacher_id = (SELECT auth.uid())
      AND tp.approved = true
  )
);
