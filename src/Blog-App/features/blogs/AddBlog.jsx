import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateBlogForm from "./CreateBlogForm";

export default function AddBlog() {
  return (
    <div className="self-end px-8 py-2">
      <Modal>
        <Modal.Open opens="form">
          <Button>Add Blog</Button>
        </Modal.Open>
        <Modal.Window windowName="form">
            <CreateBlogForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}
