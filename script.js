let initialSquareValue = [
  {corner: 'top', value: 0}, 
  {corner: 'right', value: 0}, 
  {corner: 'bottom', value: 0}, 
  {corner: 'left', value: 0}
]

const [squareField] = document.getElementsByClassName('square')
const [topWrapperField, bottomWrapperField] = document.getElementsByClassName('wrapper')

const [strong] = squareField.children

const [topLeftInput, toRightInput] = topWrapperField.children
const [bottomLeftInput, bottomRightInput] = bottomWrapperField.children

const parseToPx = (value) => Number(value) > 0 ? String(value).concat('px') : String(value)

const formatString = (newValue, placement) => {
  const findQuareIndex = initialSquareValue.findIndex(field => field.corner === placement)
  initialSquareValue[findQuareIndex].value = newValue || 0

  const checkIsEqual = initialSquareValue.map(item => item.value).filter((item, index, arr) => arr.indexOf(item) === index)

  if(checkIsEqual.length === 1){
    return parseToPx(checkIsEqual[0])
  }

  const [top, right, bottom, left] = initialSquareValue  

  if(top.value === bottom.value && right.value === left.value){
    return `${parseToPx(top.value)} ${parseToPx(right.value)}`
  }

  return `${parseToPx(top.value)} ${parseToPx(right.value)} ${parseToPx(bottom.value)} ${parseToPx(left.value)}` 
}


const handleChange = (e, field) => {
  const newStyle = formatString(e.target.value, field)

  strong.textContent = `border-radius: ${newStyle}`
  squareField.style.borderRadius = newStyle
} 


topLeftInput.addEventListener('keyup', (e) => handleChange(e, 'top'))
toRightInput.addEventListener('keyup', (e) => handleChange(e, 'right'))
bottomRightInput.addEventListener('keyup', (e) => handleChange(e, 'bottom'))
bottomLeftInput.addEventListener('keyup', (e) => handleChange(e, 'left'))

topLeftInput.removeEventListener('keyup', (e) => handleChange(e, 'top'))
toRightInput.removeEventListener('keyup', (e) => handleChange(e, 'right'))
bottomRightInput.removeEventListener('keyup', (e) => handleChange(e, 'bottom'))
bottomLeftInput.removeEventListener('keyup', (e) => handleChange(e, 'left'))
