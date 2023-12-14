import Button from "./Button";

export default function ConfirmDelete({resourceName, onCloseModal, isDeleting, onClick}) {
    console.log(resourceName, isDeleting);
  return (
    <div className="text-stone-100 flex flex-col gap-4 rounded p-6 mt-4">
      <h2 className="capitalize font-bold text-2xl">Delete Product</h2>
      <h3 className="font-normal text-lg">
        Are you sure you want to delete {resourceName} permanently? This action
        cannot be undone.
      </h3>
      <div className="flex justify-end gap-2">
        <Button onClick={onCloseModal}>Cancel</Button>
        <Button onClick={onClick}>{isDeleting ? 'deleting' : 'Delete'}</Button>
      </div>
    </div>
  );
}
