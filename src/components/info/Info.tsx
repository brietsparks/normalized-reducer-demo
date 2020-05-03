import React, { ReactNode } from 'react';
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

export const Section = (props: { children: ReactNode }) => {
  const classNames = useStyles();
  return <div className={classNames.section}>{props.children}</div>
};

export interface SummaryProps {
  title: string,
  summary?: string,
}
export function SummarySection({ title, summary = '', }: SummaryProps) {
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

export interface CodeProps {
  children?: string|string[]
}
export function Code({ children }: CodeProps) {
  const classNames = useStyles();

  return (
    <pre className={classNames.preformat}>
      <code>
        {Array.isArray(children) ? children.join('\n') : children}
      </code>
    </pre>
  );
}

export interface ExternalLinkProps {
  elemId?: string,
  text: string,
  url?: string
}

export function ExternalLink({ elemId, text, url, ...props }: ExternalLinkProps) {
  const classNames = useStyles();

  if (!elemId && !url) {
    throw new Error(('ExternalLink expects either an elemId or url'))
  }

  const href = url ? url : `${urlBase}#${elemId}`;

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {text}<OpenInNewIcon className={classNames.docsIcon}/>
    </a>
  );
}

export interface ActionInfoProps {
  action: string,
  docElemId: string,
  example: string|string[],
}

export function ActionInfoSections({
  action,
  docElemId,
  example,
}: ActionInfoProps) {
  const classNames = useStyles();

  return (
    <div>
      <Section>
        <Typography>
          <span className={classNames.label}>Action: </span>
          <ExternalLink elemId={docElemId} text={action} />
        </Typography>
      </Section>

      <Section>
        <Label>Example:</Label>
        <Code>{example}</Code>
      </Section>
    </div>
  )
}

export function InfoSections({
  title,
  summary,
  action,
  docElemId,
  example
}: Props) {
  return (
    <div>
      <SummarySection title={title} summary={summary}/>
      <ActionInfoSections action={action} docElemId={docElemId} example={example}/>
    </div>
  );
}
