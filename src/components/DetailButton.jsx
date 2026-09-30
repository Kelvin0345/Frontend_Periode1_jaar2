import { Link } from 'react-router-dom';

function DetailButton(props) {
  return (
    <Link to={`/detail/${props.id}`}>
      Naar detailpagina
    </Link>
  );
}

export default DetailButton;