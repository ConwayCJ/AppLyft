export default function Themes() {

  const changeTheme = (e: React.ChangeEvent<HTMLSelectElement>) => {
    document.body.setAttribute('data-theme', e.target.value)
  }

  return (
    <select onChange={changeTheme} className="select select-accent select-sm">
      <option disabled defaultValue={"More Themes"}>More Themes</option>
      <option value="dark">dark</option>
      <option value="light">light</option>
      <option value="dracula">dracula</option>
      <option value="acid">acid</option>
      <option value="night">night</option>
      <option value="fantasy">fantasy</option>
    </select>
  )
}