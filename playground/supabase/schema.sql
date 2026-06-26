-- Run in the Supabase SQL editor.
create table if not exists conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null default 'New chat',
  created_at timestamptz not null default now()
);

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references conversations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('user','assistant')),
  content text,
  spec jsonb,
  observations     jsonb,
  version          int,
  based_on_version int,
  created_at timestamptz not null default now()
);

create index if not exists messages_conversation_idx on messages(conversation_id, created_at);

alter table conversations enable row level security;
alter table messages enable row level security;

create policy "own conversations" on conversations
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own messages" on messages
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());
