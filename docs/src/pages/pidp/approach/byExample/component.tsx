import { CardContent, Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';

import DotsMobileStepper from '../../../../../../src/components/stepper/DotsMobileStepper';
import { Content, Stack } from '../../../../../../src/typings/data/import';

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    paper: {
      // padding: theme.spacing(2),
      textAlign: 'center'
      // color: theme.palette.text.secondary
    },
    typographyDisabled: {
      // color: theme.palette.text.disabled
    },
    typographyEnabled: {
      // color: theme.palette.text.primary
    },
    row: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center'
    }
  })
);

const stepsLength = (array: Array<Content> = []): number => {
  return array.map(item => item.step).filter((value, index, self) => self.indexOf(value) === index)
    .length;
};

const stepsFiltered = (array: Array<Content> = [], step: number): Array<Content> => {
  return array.map(item => item).filter(value => value.step === step);
};

const generateGrid = (elements: Array<Content> = [], active: boolean) => {
  const classes = useStyles({});
  return elements.map((content, index) => {
    return (
      <Grid item xs={content.size} className={classes.row} key={`${content.title} ${index}`}>
        <CardContent className={classes.paper}>
          <Typography
            variant='subtitle1'
            gutterBottom
            className={active ? classes.typographyEnabled : classes.typographyDisabled}
          >
            {content.title}
          </Typography>
          <Typography
            variant='subtitle2'
            gutterBottom
            className={active ? classes.typographyEnabled : classes.typographyDisabled}
          >
            {content.description}
          </Typography>
        </CardContent>
      </Grid>
    );
  });
};

const ByExample = ({ elements = [] }: Stack) => {
  const classes = useStyles({});

  const [step, setStep] = React.useState(0);

  return (
    <Grid container className={classes.row}>
      <Grid item xs={12} className={classes.row}>
        <CardContent className={classes.paper}>
          {stepsFiltered(elements, step)[0].image}
        </CardContent>
      </Grid>
      <Grid item xs={12} className={classes.row}>
        <DotsMobileStepper
          steps={stepsLength(elements)}
          currentStep={(currentStep: number) => {
            setStep(currentStep);
          }}
        />
      </Grid>
      {generateGrid(stepsFiltered(elements, step), true)}
    </Grid>
  );
};

export { ByExample };
export default ByExample;
