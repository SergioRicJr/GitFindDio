import './styles.css'

export default function ItemList({title, description, link}) {
  return (
    <div className='item-list'>
        <strong><a href={link} target='_blank' rel="noreferrer">{title}</a></strong>
        <p>{description}</p>
        <hr />
    </div>
  )
}
