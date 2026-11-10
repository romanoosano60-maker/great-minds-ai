-- Restore the teacher approval check to the consent status that only the
-- guardian-consent SECURITY DEFINER RPC can set. The guardian_relationships
-- table deliberately exposes link rows only to the linked guardian/student;
-- querying it directly inside this teacher RLS policy would hide those rows
-- from teachers and incorrectly block valid approvals.
-- Defence in depth remains in classroom-call-token, which checks the active
-- guardian link as the student/guardian caller before issuing any call token.
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
);
