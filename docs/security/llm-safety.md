# LLM Safety

LLM calls must be server-side only.

Any feature that calls an LLM, imports GitHub repositories, generates questions, creates project stories, embeds content, or processes Microsoft Learn source material must include rate limits, content-hash caching, server-side secret handling, a budget cap or kill switch, and failure logging before it is considered complete.
