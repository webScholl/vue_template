
export default {
  bind: function(el, binding) {
    var can = document.createElement('canvas')
    el.appendChild(can)
    can.width = 200
    can.height = 150
    can.style.display = 'none'
    var cans = can.getContext('2d')
    cans.rotate((-20 * Math.PI) / 180)
    cans.font = '16px Microsoft JhengHei'
    cans.fillStyle = 'rgba(180, 180, 180, 0.3)'
    cans.textAlign = 'left'
    cans.textBaseline = 'Middle'
    cans.fillText(binding.value, can.width / 10, can.height / 2)
    el.style.backgroundImage = 'url(' + can.toDataURL('image/png') + ')'
  }
}
