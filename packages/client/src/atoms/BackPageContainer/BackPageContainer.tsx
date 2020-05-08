import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { goBack } from 'utils';
import Header, { MenuTypes } from 'components/Header';
import PageContainer from 'atoms/PageContainer';
import { BackPageContainerProps } from './types';

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    textTransform: 'capitalize',
    margin: theme.spacing(1, 0, 3),
  },
}));

const BackPageContainer: React.FC<BackPageContainerProps> = ({
  id,
  title,
  backGroundShape,
  navItems,
  children,
}) => {
  const { wrapper, header } = useStyles();
  const history = useHistory();
  const onButtonClick = () => goBack(history);

  return (
    <>
      <Header
        type={MenuTypes.BACK}
        onButtonClick={onButtonClick}
        navItems={navItems}
      />
      <PageContainer backGroundShape={backGroundShape} data-testid={id}>
        <Box className={wrapper}>
          {title && (
            <Box className={header}>
              <Typography component='h2' variant='h2'>
                {title}
              </Typography>
            </Box>
          )}
          {children}
        </Box>
      </PageContainer>
    </>
  );
};

export default BackPageContainer;
