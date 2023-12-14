export default function TeamMember({ member }) {
  const { id, name, avatar } = member;

  return (
    <div className="checkbox-container">
      <img src={`/public${avatar}`} className="team-avater" />
      <p className="label">{name}</p>
    </div>
  );
}
