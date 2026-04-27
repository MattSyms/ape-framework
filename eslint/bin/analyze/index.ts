/*
 * Usage: yarn analyze
 */
import { getBaseRules } from './getBaseRules.js'
import { getImportRules } from './getImportRules.js'
import { getStylisticRules } from './getStylisticRules.js'
import { getTypescriptDisabledRules } from './getTypescriptDisabledRules.js'
import { getTypescriptRules } from './getTypescriptRules.js'
import { getVueRules } from './getVueRules.js'

const ruleGetters = {
  base: getBaseRules,
  import: getImportRules,
  stylistic: getStylisticRules,
  typescript: getTypescriptRules,
  typescriptDisabled: getTypescriptDisabledRules,
  vue: getVueRules,
}

for (const [ruleset, getRules] of Object.entries(ruleGetters)) {
  process.stdout.write(`Analyzing ${ruleset} rules:`)

  const errors: string[] = []

  const rules = await getRules()

  const projectRules = Object.keys(
    (await import(`rules/${ruleset}.js`))[`${ruleset}Rules`],
  )

  rules.forEach((rule) => {
    if (!projectRules.includes(rule)) {
      errors.push(`\n- missing: ${rule}`)
    }
  })

  projectRules.forEach((projectRule, index) => {
    if (!rules.includes(projectRule)) {
      errors.push(`\n- extraneous: ${projectRule}`)
    }
    if (index > 0 && projectRule < projectRules[index - 1]) {
      errors.push(`\n- unordered: ${projectRules[index - 1]}`)
    }
  })

  process.stdout.write(`${errors.length ? errors.join('') : ' OK'}\n`)
}
