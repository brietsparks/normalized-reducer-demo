import React from 'react';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

import { useStyles } from './styles';

export interface Props {
  title: string,
  summary: string,
  action: string,
  docElemId: string,
  example: string|string[],
}

const urlBase = 'https://github.com/brietsparks/normalized-reducer';

export const Label = (props: TypographyProps) => {
  const classNames = useStyles();
  return <Typography className={classNames.label} {...props} />
};


export interface SummaryProps {
  title: string,
  summary: string,
}
export function Summary({ title, summary, }: SummaryProps) {
  const classNames = useStyles();
  return (
    <div>
      <Typography variant="h5" component="h2">{title}</Typography>

      <div className={classNames.section}>
        <Typography>{summary}</Typography>
      </div>
    </div>
  );
}

export interface ActionInfoProps {
  action: string,
  docElemId: string,
  example: string|string[],
}

export function ActionInfo({
  action,
  docElemId,
  example,
}: ActionInfoProps) {
  const classNames = useStyles();

  return (
    <div>
      <div className={classNames.section}>
        <Typography>
          <span className={classNames.label}>Action: </span>
          <a href={`${urlBase}#${docElemId}`} target="_blank" rel="noopener noreferrer">
            {action}<OpenInNewIcon className={classNames.docsIcon}/>
          </a>
        </Typography>
      </div>

      <div className={classNames.section}>
        <Label>Example:</Label>
        <pre className={classNames.preformat}><code>
          {Array.isArray(example) ? example.join('\n') : example}
        </code></pre>
      </div>
    </div>
  )
}

export default function Info({
  title,
  summary,
  action,
  docElemId,
  example
}: Props) {
  return (
    <div>
      <Summary title={title} summary={summary}/>
      <ActionInfo action={action} docElemId={docElemId} example={example}/>
    </div>
  );
}
