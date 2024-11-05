import Watch from './Watch';

function Watches({data, handleDel}) {
  let result = [];
  for (let watch in data) {
    result.push(<Watch watch={watch} utc={data[watch]} handleDel={handleDel} />);
  }
  return (
    <table>
      {result}
    </table>
  )
}

export default Watches;