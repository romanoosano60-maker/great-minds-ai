-- Remove a redundant unique index. The retained classrooms_classroom_code_unique
-- enforces the same lower(btrim(classroom_code)) expression and nonblank predicate.
-- Neither index backs a table constraint; both had zero observed scans.
DROP INDEX IF EXISTS public.classrooms_classroom_code_normalized_uidx;
