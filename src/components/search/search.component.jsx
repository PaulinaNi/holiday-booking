export default function Search(props) {
 const { handleSearchInput, placeholderText } = props
 return (
  <div>
   <input type="text" placeholder={placeholderText} onChange={(e) => handleSearchInput(e.target.value)} />
  </div>
 )
}