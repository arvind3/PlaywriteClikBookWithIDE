# Analytics Contract and Governance

This folder is the source of truth for analytics behavior in this book repository.

## Config source of truth

- File: `analytics.config.json`
- Validator: `python3 tools/analytics/validate_config.py --config analytics/analytics.config.json`

## Custom event taxonomy

### `chapter_view`
- Trigger: docs chapter route load.
- Purpose: chapter exposure baseline.

### `chapter_complete`
- Trigger: deep reading threshold reached (90% scroll).
- Purpose: completion quality.

### `code_copy`
- Trigger: code copy button click.
- Purpose: practical technical engagement.

### `toc_interaction`
- Trigger: table-of-contents navigation click.
- Purpose: long-form reading navigation signal.

## Required event envelope

All custom events include:

- `event_name`
- `book_id`
- `chapter_id`
- `chapter_title`
- `content_group`
- `page_path`
- `engagement_bucket`
- `version`

## KPI mapping

1. Users and engaged sessions.
2. Audience by country and region.
3. Audience by device category.
4. Top chapters by engaged sessions.
5. Chapter completion and interaction rates.

## GA4 custom dimensions checklist

Create event-scoped custom dimensions for:

1. `book_id`
2. `chapter_id`
3. `chapter_title`
4. `content_group`
5. `engagement_bucket`
6. `version`

Recommended additional:

7. `authoring_stack`
8. `publish_channel`

## Privacy note

This implementation uses a `balanced_by_region` policy with client-side region inference. On static hosting, region inference is heuristic and should be reviewed against legal requirements.
