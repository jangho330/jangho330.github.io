# Jang Ho Lee — 개인 홈페이지

GitHub Pages(Jekyll)로 동작하는 정적 사이트입니다. 컴퓨터에 아무것도 설치하지 않고, GitHub 웹사이트에서만 관리할 수 있습니다.

## 1. 처음 올리기 (한 번만)

1. GitHub 계정이 없다면 https://github.com 에서 만듭니다.
2. 오른쪽 위 **+ → New repository**. 저장소 이름은 반드시 `jangho330.github.io` (사용자명 + .github.io), **Public**, 나머지는 기본값으로 **Create repository**.
3. 만들어진 빈 저장소 화면에서 **uploading an existing file** 링크를 클릭하고, 이 폴더 안의 **모든 파일과 폴더**를 창에 끌어다 놓습니다 (`_config.yml`, `_data`, `_includes`, `_layouts`, `_posts`, `assets`, `images`, `posts`, `index.html`, `404.html`, `Gemfile`, `.gitignore`). 아래 **Commit changes**.
4. `_config.yml`의 `url`은 이미 `https://jangho330.github.io`로 설정되어 있습니다. 같은 파일의 `scholar:`에 Google Scholar 프로필 주소를 넣으면(연필 아이콘으로 편집) 링크가 자동으로 나타납니다.
5. 1–2분 뒤 `https://jangho330.github.io` 에서 사이트를 확인할 수 있습니다. (저장소 **Settings → Pages**에 "Your site is live at …"가 보이면 정상입니다.)

## 2. 글 올리기 (Posts)

`_posts` 폴더에서 **Add file → Create new file**을 누르고, 파일 이름을 `YYYY-MM-DD-제목.md` 형식으로 씁니다. 예: `2026-09-15-genai-in-class.md`

```markdown
---
title: "수업에서 GenAI 챗봇을 써 본 소감"
date: 2026-09-15
tags: [GenAI, teaching]
excerpt: "목록에 보일 한두 문장 요약 (선택)"
---

여기부터 본문. 일반 문장을 쓰면 됩니다. **굵게**, *기울임*, [링크](https://example.com) 가능.

## 소제목

이미지: images 폴더에 파일을 올린 뒤

![사진 설명](/images/photo.jpg)

유튜브: 영상 주소를 한 줄에 단독으로 붙여 넣으면 플레이어로 바뀝니다.

https://www.youtube.com/watch?v=XXXXXXXXXXX
```

- **이미지 올리기**: `images` 폴더 → **Add file → Upload files**. 파일 이름은 영문·숫자·하이픈만 쓰는 것이 안전합니다 (예: `class-2026-09.jpg`).
- 글 목록의 썸네일은 본문의 첫 이미지가 자동으로 쓰입니다. 다른 이미지를 쓰려면 머리말에 `image: /images/thumb.jpg`를 추가합니다.
- 캡션이 있는 그림: `{% include figure.html src="/images/photo.jpg" alt="설명" caption="캡션" %}`
- 태그는 자유롭게 적습니다. Posts 페이지에 태그 버튼이 자동으로 생깁니다.
- 글을 지우려면 해당 `.md` 파일을 삭제하면 됩니다. 예시 글 `2026-08-29-welcome.md`는 삭제해도 됩니다.
- 휴대폰에서도 github.com에 접속해 같은 방법으로 글을 쓸 수 있습니다.

## 3. 논문 추가하기

`_data/publications.yml`을 열어 **맨 위**에 새 항목을 추가합니다 (최신 논문이 위로 오도록).

```yaml
- id: 86
  year: 2026
  authors: Lee, J. H., & Kim, K.
  title: 논문 제목
  journal: System
  volume: '135'
  issue: '2'          # 없으면 이 줄 삭제
  pages: 103800       # 페이지 범위 또는 논문번호
  url: https://doi.org/10.1016/j.system.2026.103800
```

- 온라인 선공개 논문은 `volume`·`issue`·`pages` 대신 `status: Advance online publication`을 씁니다.
- 연도 버튼은 자동으로 만들어지고, 2021년 이전은 "2011–2021"로 묶입니다 (`index.html`에서 `2022` 두 곳을 바꾸면 기준 연도가 바뀝니다).

## 4. 그 밖의 내용 수정

| 바꿀 내용 | 파일 |
|---|---|
| 이름, 이메일, 주소, 프로필 링크, 갱신일 | `_config.yml` |
| 소개 문단 (About), 한 줄 소개 | `index.html` |
| 학력·경력·편집위원 | `_data/cv.yml` |
| 연구 분야 카드 | `_data/research.yml` |
| 연구과제, 수상 | `_data/projects.yml`, `_data/awards.yml` |
| 강의 과목 | `_data/teaching.yml` |
| 프로필 사진 | `assets/img/profile.jpg` (같은 이름으로 덮어쓰기, 세로가 긴 사진 권장) |
| 색상·글꼴 | `assets/css/style.css` 맨 위 `:root` 부분 (`--blue: #004C97`은 Pantone 2945C) |
| 하단 "For prospective students" 문구 | `_layouts/default.html` |

## 5. 내 컴퓨터에서 미리 보기 (선택)

Ruby가 설치되어 있다면:

```bash
gem install bundler
bundle install
bundle exec jekyll serve
```

브라우저에서 http://localhost:4000 을 엽니다. 설치가 번거로우면 GitHub에 바로 올려서 확인해도 됩니다 — 저장할 때마다 1–2분 안에 반영됩니다.
