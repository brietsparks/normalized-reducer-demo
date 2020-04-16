import React from 'react';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

import { useStyles } from './styles';

export interface Props {
  title: string,
  summary: string,
  docElemId: string,
  example: string,
}

const urlBase = 'https://github.com/brietsparks/normalized-reducer';

export const Label = (props: TypographyProps) => {
  const classNames = useStyles();
  return <Typography className={classNames.label} {...props} />
};

export default function ActionInfo({
  title,
  summary,
  docElemId,
  example
}: Props) {
  const classNames = useStyles();

  return (
    <div>
      <Typography variant="h5" component="h2">{title}</Typography>

      <div className={classNames.section}>
        <Typography>{summary}</Typography>
      </div>

      <div className={classNames.section}>
        <Typography>
          <span className={classNames.label}>API: </span>
          <a href={`${urlBase}#${docElemId}`} target="_blank" rel="noopener noreferrer">
            See docs <OpenInNewIcon className={classNames.docsIcon}/>
          </a>
        </Typography>
      </div>

      <div className={classNames.section}>
        <Label>Example:</Label>
        <pre className={classNames.preformat}><code>{example}</code></pre>
      </div>
    </div>
  );
}
