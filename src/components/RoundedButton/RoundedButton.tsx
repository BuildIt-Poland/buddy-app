import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const StyledButton = withStyles({
  root: {
    borderRadius: '2rem',
  },
})(Button);

export default StyledButton;
