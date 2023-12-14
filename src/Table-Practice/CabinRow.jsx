import Menus from "./Menus";

export default function CabinRow({ cabin }) {
  const { id, cabinName, maxCapacity, price, discount } = cabin;

  return (
    <div className="row">
      <div>{cabinName}</div>
      <div>Fits up to {maxCapacity} people</div>
      <div>{price}</div>
      <div>{discount !== 0 ? discount : <span>&mdash;</span>}</div>
      <div>
        <Menus.Menu>
          <Menus.Toggle cabin={cabinName} />
          <Menus.List windowCabin={cabinName}>
            <Menus.Button>Update {id}</Menus.Button>
            <Menus.Button>Delete {id}</Menus.Button>
          </Menus.List>
        </Menus.Menu>
      </div>
    </div>
  );
}
