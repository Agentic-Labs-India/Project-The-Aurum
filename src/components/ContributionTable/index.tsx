import type { Partner } from '@root/payload-types'

import { ArrowIcon } from '@root/icons/ArrowIcon'
import Link from 'next/link'

import { Pill } from '@components/Pill'

import classes from './index.module.scss'

type ContributionTableProps = {
  contributions: Partner['content']['contributions']
}

function getContributionLink(
  type: 'discussion' | 'issue' | 'pr',
  number: number,
  repo: string,
): string {
  const base = `https://github.com/payloadcms/${repo}`

  if (type === 'pr') {
    return `${base}/pull/${number}`
  }

  if (type === 'issue') {
    return `${base}/issues/${number}`
  }

  return `${base}/discussions/${number}`
}

function getContributionLabel(type: 'discussion' | 'issue' | 'pr', number: number): string {
  const typeLabel = type === 'discussion' ? 'Discussion' : type === 'issue' ? 'Issue' : 'PR'
  return `${typeLabel} #${number}`
}

export const ContributionTable = ({ contributions }: ContributionTableProps) => {
  if (!contributions || !contributions.length) {
    return null
  }

  return (
    <div className={classes.contributionList}>
      {contributions.map((contribution) => {
        const { type, number, repo } = contribution
        const url = getContributionLink(type, number, repo)

        return (
          <Link className={classes.contribution} href={url} key={`${repo}-${type}-${number}`} target="_blank">
            <span className={classes.number}>#{number}</span>
            <span className={classes.title}>{getContributionLabel(type, number)}</span>
            <Pill
              className={classes.pill}
              color={type === 'discussion' ? 'default' : type === 'issue' ? 'warning' : 'success'}
              text={type === 'discussion' ? 'Discussion' : type === 'issue' ? 'Issue' : 'PR'}
            />
          </Link>
        )
      })}
    </div>
  )
}
