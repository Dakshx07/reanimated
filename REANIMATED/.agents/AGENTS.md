## 0. Before Starting Any Task

- [ ] Restate the goal in one concrete, checkable sentence (not "improve the code" — "all tests in `test_x.py` pass and lint is clean")
- [ ] List what "done" looks like as a checklist, not a feeling
- [ ] Identify files/modules this task is allowed to touch — nothing outside that scope
- [ ] Set a step budget (e.g. max 15 act/observe cycles) before stopping to re-plan or ask for help

## 1. The Loop

```
1. PERCEIVE  - read current file state, last tool output, any errors
2. PLAN      - decide ONE next action (not the whole solution)
3. ACT       - do that one action (edit, run, test, search)
4. OBSERVE   - read the real result, don't assume it worked
5. CHECK     - does this satisfy the "done" checklist?
   - yes -> go to VERIFY
   - no  -> go back to PLAN
6. VERIFY    - run tests/lint/build; confirm against checklist
   - pass -> STOP (success)
   - fail -> PLAN again (max N times), else ESCALATE
```

## 2. Rules the Agent Must Follow

1. **One change at a time.** Never bundle unrelated edits into a single action — makes failures hard to isolate.
2. **Always verify, never assume.** After every action, check the actual output/result before deciding next step. Don't mark something done because it "should" work.
3. **Re-read before re-editing.** If editing a file again, re-view it first — earlier views go stale after edits.
4. **Respect the step budget.** If the budget is exhausted and the goal isn't met, stop and report status — don't silently keep trying forever.
5. **Fail loud, not silent.** If a tool call errors, surface the actual error. Don't paper over it or guess.
6. **No scope creep.** Stay inside the files/modules defined for this task. If something outside scope needs changing, flag it — don't just do it.
7. **Smallest viable fix.** Prefer the minimal change that satisfies the checklist over a larger rewrite, unless the task explicitly asks for refactoring.
8. **Tests/lint are the source of truth**, not the agent's own judgment of "looks right."
9. **When stuck twice on the same error, change approach** — don't repeat the same failing action a third time.
10. **Escalate clearly.** If blocked, state exactly what's blocking, what was tried, and what's needed to unblock — don't just stop silently.

## 3. Stop Conditions (pick what applies to your project)

- All items in the "done" checklist are true, AND verification (tests/build/lint) passes
- Step budget exhausted -> stop and report partial progress + blockers
- Same error repeats 2x in a row -> stop and report instead of retrying blindly
- Task requires touching out-of-scope files -> stop and ask before proceeding

## 4. Running Multiple Agents Concurrently

If more than one agent/loop is active on the same project:

- Each agent gets a **non-overlapping scope** (different files/modules/features)
- Define one **merge point** — a single place (branch, PR, review step) where outputs combine
- Each agent's step budget is independent — one stuck agent must not block the others
- Shared state (todo lists, status files) should be append-only or reviewed before merge — avoid silent overwrites

## 5. Per-Task Checklist Template (copy this for each task)

```
Task: ____________________
Done means: 
  [ ] ____________________
  [ ] ____________________
Scope (files/modules allowed): ____________________
Step budget: ____
Verification method (tests/lint/build): ____________________
Escalation trigger: ____________________
```

## 6. Quality Gate Before Calling Anything "Done"

- [ ] Tests pass (not just "ran without crashing")
- [ ] Lint/type-check clean
- [ ] No unrelated files changed
- [ ] Changes match the original "done" checklist, not a different scope
- [ ] If anything was skipped or assumed, it's explicitly stated in the report