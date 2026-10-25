create table if not exists public.courses (
  id integer primary key check (id > 0),
  title text not null check (length(trim(title)) > 0),
  description text not null default '',
  category text not null check (length(trim(category)) > 0),
  instructor text not null check (length(trim(instructor)) > 0),
  level text not null check (length(trim(level)) > 0),
  duration text not null check (length(trim(duration)) > 0),
  lessons integer not null check (lessons > 0),
  students integer not null default 0 check (students >= 0),
  progress integer not null default 0 check (progress between 0 and 100),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.courses enable row level security;

revoke all on table public.courses from anon, authenticated;
grant select on table public.courses to authenticated;

drop policy if exists "Authenticated users can read courses"
  on public.courses;
create policy "Authenticated users can read courses"
  on public.courses
  for select
  to authenticated
  using (true);

create or replace function public.set_courses_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists courses_set_updated_at on public.courses;
create trigger courses_set_updated_at
  before update on public.courses
  for each row
  execute function public.set_courses_updated_at();

insert into public.courses (
  id,
  title,
  description,
  category,
  instructor,
  level,
  duration,
  lessons,
  students,
  progress
)
values
  (
    1,
    'Web Development Fundamentals',
    'Pelajari dasar pembuatan website mulai dari HTML, CSS, hingga JavaScript.',
    'PROGRAMMING',
    'Dimas Saputra',
    'Pemula',
    '6 Jam',
    24,
    324,
    0
  ),
  (
    2,
    'UI/UX Design Fundamentals',
    'Pelajari proses merancang produk digital yang nyaman, menarik, dan berorientasi pada pengguna.',
    'DESIGN',
    'Sarah Wijaya',
    'Pemula',
    '5 Jam',
    20,
    218,
    35
  ),
  (
    3,
    'Digital Business Strategy',
    'Pelajari strategi membangun dan mengembangkan bisnis di era digital.',
    'BUSINESS',
    'Raka Mahendra',
    'Menengah',
    '7 Jam',
    28,
    176,
    0
  ),
  (
    4,
    'Career Preparation',
    'Persiapkan diri memasuki dunia kerja melalui personal branding, CV, dan interview.',
    'CAREER',
    'Nadia Putri',
    'Pemula',
    '4 Jam',
    16,
    291,
    60
  ),
  (
    5,
    'AI for Productivity',
    'Gunakan teknologi AI untuk membantu proses belajar, bekerja, dan meningkatkan produktivitas.',
    'AI',
    'Fajar Nugraha',
    'Menengah',
    '5 Jam',
    18,
    403,
    20
  ),
  (
    6,
    'Data Analysis Basic',
    'Kenali dasar analisis data dan bagaimana mengubah data menjadi informasi yang berguna.',
    'DATA',
    'Andika Prasetyo',
    'Pemula',
    '6 Jam',
    22,
    185,
    0
  )
on conflict (id) do nothing;
