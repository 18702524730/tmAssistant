// https://github.com/michael-ciniawsky/postcss-load-config
const replaceTagSelectorMap = require('postcss-mpvue-wxss/lib/wxmlTagMap')

const optopns = {
  cleanSelector: ['*'],
  remToRpx: 32,
  replaceTagSelector: Object.assign(replaceTagSelectorMap, {
    '*': 'view, text' // 将覆盖前面的 * 选择器被清理规则
  })
}

module.exports = {
  "plugins": {
    // 添加 postcss-autoreset 设置
    // Add postcss-autoreset configs
    "postcss-autoreset": {
      reset: {
        // 这里的声明会应用于所有 WXSS 选择器
        // Styles apply to all WXSS selectors
        boxSizing: "border-box",
      },
    },
    "autoprefixer": {},
    "postcss-mpvue-wxss": optopns
  }
}
