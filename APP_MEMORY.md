# Application Memory

This file contains long-term project knowledge.

AI assistants must read this file before making architectural decisions, modifying core systems, or suggesting major changes.

The purpose is to preserve important decisions, history, constraints, and lessons learned across development sessions.

---

# Project Identity

## Application Name

AI-KIT AI Audit & Engineering Governance Framework (AI-KIT)

## Current Version

1.0.0 (Production Master Framework)

## Project Status

Production / Active Master Governance Framework

## Owner / Team

RAYMIND Creativez (`raymindcreativez`) / wedoit-projects

---

# Project History

## Creation Date

2026-10-01

## Original Purpose

AI-assisted coding often suffers from lack of context continuity, undisciplined ad-hoc patching, architectural drift, missed regression testing, and security oversights. 

AI-KIT was created as a centralized, repeatable engineering governance system that enables AI coding assistants (such as Antigravity, Claude, and Gemini) to operate under strict engineering standards. It introduces specialized AI roles, standardized audit rubrics, quality gates, and systematic phased remediations for commercial web, mobile, and backend applications.

---

# Architecture Decisions (ADR)

## ADR-001: Centralized Master Framework Pattern

- **Date**: 2026-10-01
- **Topic**: Framework Distribution & Modularity
- **Decision**: Maintain a single master copy of AI-KIT (`c:\wedoit-projects\AI-KitAI_Audit_Framework`) that governs projects via references, rather than cloning the entire framework into every target repository. Target repositories only receive localized memory files (`PROJECT_CONTEXT.md`, `APP_MEMORY.md`, `CHANGELOG_AI.md`, and project-specific `_audit/` folders).
- **Reason**: Prevents fragmentation, ensures updates to audit standards propagate to all projects, and keeps client application codebases clean.
- **Alternatives Considered**: Copying the entire AI-KIT directory into each application repository (rejected due to maintenance overhead and bloated repository sizes).
- **Impact**: Clean separation between development governance tools and project deliverables.
- **Status**: Active

## ADR-002: Role-Based Multi-Agent Persona Orchestration

- **Date**: 2026-10-02
- **Topic**: AI Behavioral Specialization
- **Decision**: Define specialized agent personas in `AI_AGENT_ROLES/` (`CODE_REVIEWER.md`, `ARCHITECT.md`, `DATABASE_ENGINEER.md`, `SECURITY_ENGINEER.md`, `QA_ENGINEER.md`, `DEVOPS_ENGINEER.md`, `PRODUCT_MANAGER.md`).
- **Reason**: Single-prompt LLMs easily miss domain-specific details (e.g. SQL deadlocks or XSS vulnerabilities). Explicit persona switching prompts the AI to evaluate tasks through specialized engineering lenses.
- **Alternatives Considered**: Generic single-agent prompt instructions (rejected due to superficial review depth).
- **Impact**: High-fidelity reviews; strict database transaction integrity; zero-tolerance security checks.
- **Status**: Active

## ADR-003: Six-Pillar Audit & Phased Remediation Lifecycle

- **Date**: 2026-10-05
- **Topic**: Systematic Application Auditing
- **Decision**: Structure audits across 6 explicit pillars defined in `AI_Audit_Framework/01_APP_AUDIT_FRAMEWORK.md`:
  1. Architecture & Design
  2. Functionality & Business Logic
  3. Security & Access Control
  4. Performance & Scalability
  5. User Experience & Reliability
  6. Maintainability & Production Readiness
  Remediation must be organized into phased roadmaps (Phase 1: Release Blockers, Phase 2: Transactional Integrity, Phase 3: Performance & Analytics).
- **Reason**: Prevents chaotic bug-fixing where non-critical UI tweaks distract from fatal financial bugs or security vulnerabilities.
- **Alternatives Considered**: Free-form issue lists (rejected due to lack of prioritization).
- **Impact**: Predictable, release-gated software delivery with clear sign-offs.
- **Status**: Active

## ADR-004: Universal Project Memory Triad

- **Date**: 2026-10-06
- **Topic**: Context Preservation Across Agent Sessions
- **Decision**: Mandate three living documentation files in every project managed by AI-KIT:
  1. `PROJECT_CONTEXT.md` (Identity, purpose, tech stack, core business flows)
  2. `APP_MEMORY.md` (Long-term architectural decisions, constraints, active state)
  3. `CHANGELOG_AI.md` (Chronological development and release ledger)
- **Reason**: LLM context windows are ephemeral and truncate over long conversations. The memory triad provides an instant, durable state checkpoint for any incoming AI agent.
- **Alternatives Considered**: Relying on conversation history alone or inline code comments (rejected due to token loss and compaction).
- **Impact**: Zero hallucinated architecture; consistent continuity across sessions.
- **Status**: Active

---

# Technology Decisions

## Core Architecture

- **Specification Format**: GitHub Flavored Markdown (`.md`) with YAML-compliant frontmatter and Mermaid diagramming.
- **Tool Compatibility**: Optimized for Google Antigravity IDE, Claude Code, Cursor, and OpenHands.
- **Command Structure**: Declarative markdown commands in `Prompt_Command_Library/` suitable for direct `@file` mentions.

---

# Completed Features

## 1. Master AI Instructions & Behavioral Rules
- `MASTER_AI_INSTRUCTIONS.md`: Core system instructions and agent protocol.
- `ANTIGRAVITY_RULES.md`: Execution rules for tool usage, terminal handling, and file edits.
- `DEV_WORKFLOW.md`: 5-step development loop (Context -> Plan -> Implement -> Validate -> Document).
- `QUALITY_GATE.md`: Non-negotiable pass/fail checklist (no syntax errors, 100% test pass, clean builds, zero unhandled errors).

## 2. Specialized AI Agent Roles (`AI_AGENT_ROLES/`)
- `CODE_REVIEWER.md`: Clean architecture, TypeScript compliance, DRY, error boundaries.
- `ARCHITECT.md`: System design, modular boundaries, decoupled layers, scalability.
- `DATABASE_ENGINEER.md`: ACID compliance, relational integrity, index optimization, atomic `F()` expressions.
- `SECURITY_ENGINEER.md`: OWASP Top 10, HttpOnly cookie auth, CSRF/CORS, secret isolation.
- `QA_ENGINEER.md`: Automated testing, behavior-driven test suites, regression prevention.
- `DEVOPS_ENGINEER.md`: CI/CD, Docker packaging, deployment guides, environment variables.
- `PRODUCT_MANAGER.md`: Business requirements, user journeys, acceptance criteria.

## 3. Comprehensive Audit Framework (`AI_Audit_Framework/`)
- `00_AGENT_ROLE.md`: Auditor protocol and objective guidelines.
- `01_APP_AUDIT_FRAMEWORK.md`: 6-pillar evaluation rubrics.
- `02_DEBUGGING_WORKFLOW.md`: Root-cause investigation methodology.
- `03_FIX_IMPLEMENTATION_RULES.md`: Surgical, non-destructive fix implementation rules.
- `04_SECURITY_AUDIT.md`: Deep security audit and threat modeling guide.
- `05_FINAL_REPORT_TEMPLATE.md`: Formal publication-grade audit report template.

## 4. Prompt Command Library (`Prompt_Command_Library/`)
- `AUDIT_APP.md`: Rapid audit trigger.
- `RELEASE_CHECK.md`: Production release readiness checker.
- `DEBUG_BUG.md`: Systematic bug investigation prompt.
- `PERFORMANCE_OPTIMIZATION.md`: Latency, query, and bundle optimization prompt.
- `REFACTOR_CODE.md`: Safe architectural refactoring prompt.
- `SECURITY_REVIEW.md`: Focused vulnerability audit prompt.
- `UX_REVIEW.md`: Usability, responsiveness, and design review prompt.

## 5. Flagship Production Validation
- Successfully tested and proven on the **FGVS Copra Business Management System (CBMS v2.3.0)**:
  - Audited complex full-stack Next.js 16 + Django REST application.
  - Formulated 3-phase implementation roadmap.
  - Successfully resolved 11 critical/high/medium findings (100% remediation).
  - Validated via 11 automated unit tests and clean Turbopack builds.

---

# Current Development Status

## Completed
- Core Framework v1.0.0 release.
- Complete documentation of all 6 audit pillars.
- Flagship enterprise system audit & release certification.

## In Progress
- Expansion of reusable starter templates in `APP_TEMPLATES/`.

## Planned
- Automated CLI runner (`ai-kit audit`, `ai-kit verify`) for local shell execution.
- GitHub Actions CI workflow integration template.

---

# Important Constraints

Rules that future AI sessions must respect when working with AI-KIT:
1. **Never weaken quality gates**: Never mark a project "Ready" if release blockers or unhandled exceptions remain.
2. **Preserve framework neutrality**: The master framework must remain language- and framework-agnostic (supporting Python, TypeScript, Go, Java, Flutter, etc.).
3. **Always follow the 5-step workflow**: Context -> Plan -> Implement -> Validate -> Document.
4. **Enforce evidence-based reporting**: Every audit finding must cite exact file paths, line numbers, and reproducible conditions.

---

# Security Notes

- **Secret Isolation**: Never store API keys, database credentials, or secret tokens inside AI-KIT files or templates.
- **Audit Methodology**: Audits must check `.gitignore`, cookie flags (`HttpOnly`, `SameSite`, `Secure`), and dynamic CORS parameters as standard baseline checks.

---

# Memory Maintenance Rules

When making changes to the AI-KIT Framework:
1. Record what changed and why.
2. Update ADRs if framework design decisions were modified.
3. Update `CHANGELOG_AI.md` chronologically.
