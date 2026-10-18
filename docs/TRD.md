# Technical Requirements

## Planned architecture
Vite + React + TypeScript; CSS variables and SVG for visuals; optional Motion; Web Audio API for user-initiated sounds; localStorage for versioned progress. No backend required for the initial release.

## Domain model
Chapter {id, scenes, objectives, unlocks}; Puzzle {source,target,outcome}; GameProgress {schemaVersion, currentChapter, completedObjectives, discoveredSecrets, soundMuted}; Dialogue {speaker,text,expression,trigger}.

## Rules
Central state machine controls chapter transitions; persist only durable state; support save migration and reset; use one puzzle resolver for all inventions; input by tap and keyboard, optional drag; lazy-load large assets; poster and skip for video; reduced motion.

## Validation
Build/typecheck, representative 320/375/430px viewport tests, touch and keyboard walkthrough, no horizontal overflow, refresh persistence, muted sound, slow-network fallback, console inspection and credits verification. No success claim without recorded evidence.
