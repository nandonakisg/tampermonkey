# Tampermonkey Scripts

Collection of Tampermonkey userscripts for enhancing various web applications.

## Scripts

### MyFitnessPal

#### [MyFitnessPal Protein Ratio](myfitnesspal/myfitnesspal_protein_ratio.js)
Enhances the MyFitnessPal food diary with protein ratio calculations and visual formatting.

**Features:**
- Adds a "Protein Ratio" column showing protein-to-calorie percentage
- Color-coded formatting:
  - Red/Orange (<10%): Low protein ratio
  - Green (10-15%): Medium protein ratio
  - Dark Green (>15%): High protein ratio
- Automatically sorts foods by protein ratio (highest first)
- Prevents text wrapping in the first column for better readability

**Installation:** Copy to Tampermonkey and it will activate on `myfitnesspal.com/food/diary*`

### Claude.ai

#### [Claude Artifact Width Fix](claude/claude_artifact_width.js)
Removes width restrictions on Claude artifacts for better viewing experience.

**Features:**
- Overrides Tailwind's `max-w-3xl` class
- Allows artifacts to use full available width
- Applies at document start for immediate effect

#### [Claude Table BR Fix](claude/claude_br_fix.js)
Fixes literal `<br>` text appearing in Claude artifacts by converting them to proper HTML line breaks.

**Features:**
- Scans and fixes existing `<br>` text on page load
- Monitors for dynamically added content
- Logs replacements to console for debugging

**Installation:** Copy to Tampermonkey and it will activate on `claude.ai/*`

## Installation

1. Install [Tampermonkey](https://www.tampermonkey.net/) browser extension
2. Click on any script file above
3. Copy the contents
4. Open Tampermonkey dashboard
5. Create a new script and paste the contents
6. Save

## License

MIT
