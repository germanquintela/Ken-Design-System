-- AI Builder versioning: each assistant message is a canvas version.
alter table messages
  add column if not exists observations     jsonb,   -- array of { title, detail? }
  add column if not exists version          int,     -- monotonic per conversation; null for user rows
  add column if not exists based_on_version int;      -- which version this refinement built on; null if first
