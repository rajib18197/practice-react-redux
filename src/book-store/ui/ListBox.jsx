export default function ListBox() {
  return (
    <ul className="hidden md:flex items-center space-x-6">
      <li className="font-semibold cursor-pointer">Book Store</li>
      <li className="cursor-pointer">Wishlist</li>
      <li className="cursor-pointer">My Collection</li>
    </ul>
  );
}
