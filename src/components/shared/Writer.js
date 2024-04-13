import Avatar from './Avatar';

function Writer({ value }) {
  return (
    <div>
      <Avatar />
      <p>{value.name}</p>
    </div>
  );
}

export default Writer;