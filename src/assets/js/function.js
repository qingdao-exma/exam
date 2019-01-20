
/**
 * 英文或汉字开头的汉字、英文、数字、下划线
 */
export function checkFormName (labelName) {
  return function (rule, value, callback) {
    if (!value) {
      callback(new Error('请输入' + labelName))
    } else {
      var reg = /^[A-Za-z\u4e00-\u9fa5][\s\w\u4e00-\u9fa5]+$/
      if (!reg.test(value)) {
        callback(new Error('支持以英文或汉字开头的汉字、英文、数字、下划线'))
      }
    }
    callback()
  }
}
/**
 * 以 / 开头 2-120位
 */
export function checkPath (labelName) {
  return function (rule, value, callback) {
    if (!value) {
      callback(new Error('请输入' + labelName))
    } else if (value.length < 2 || value.length > 120) {
      callback(new Error('长度在 2 到 120 个字符'))
    } else {
      var reg = /^\/.*$/
      if (!reg.test(value)) {
        callback(new Error("请输入以'/'开头的字符串"))
      }
    }
    callback()
  }
}

export function checkName (labelName) {
  return function (rule, value, callback) {
    if (!value) {
      callback(new Error('请输入' + labelName))
    } else {
      var reg = /^[a-zA-Z0-9_\-]+$/
      if (!reg.test(value)) {
        callback(new Error(labelName + "为数字、字母、下划线、减号"))
      }
    }
    callback()
  }
}

//验证手机号
export function checkTel (labelName) {
  return function (rule, value, callback) {
    if (value) {
      var reg = /^1(3|4|5|7|8)\d{9}$/
      if (!reg.test(value)) {
        callback(new Error("请输入正确的手机号码"))
      }
    }
    callback()
  }
}

//验证邮箱
export function checkEmail (labelName) {
  return function (rule, value, callback) {
    if (value) {
      var reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
      if (!reg.test(value)) {
        callback(new Error("请输入格式正确的邮箱"))
      }
    }
    callback()
  }
}

export function treeUtil (data, key, parentKey, map) {
  this.data = data
  this.key = key
  this.parentKey = parentKey
  this.treeParentKey = parentKey   
  this.treeKey = key           
  this.map = map
  if (map) {
    if (map[key]) {
      this.treeKey = map[key]
    }
  }
  this.toTree = function () {
    var data = this.data
    var pos = {}
    var tree = []
    var i = 0
    while (data.length !== 0) {
      if (data[i][this.parentKey] === '-1') {
        var _temp = this.copy(data[i])
        tree.push(_temp)
        pos[data[i][this.key]] = [tree.length - 1]
        data.splice(i, 1)
        i--
      } else {
        var posArr = pos[data[i][this.parentKey]]
        if (posArr !== undefined) {                    
          var obj = tree[posArr[0]]
          for (var j = 1; j < posArr.length; j++) {
            obj = obj.children[posArr[j]]
          }
          var _temp = this.copy(data[i])
          obj.children.push(_temp)
          pos[data[i][this.key]] = posArr.concat([obj.children.length - 1])
          data.splice(i, 1)
          i--
        }
      }
      i++
      if (i > data.length - 1) {
        i = 0
      }
    }
    tree.forEach((item) => {
      if (item.children.length > 1) {
        item.children = _.orderBy(item.children, ['location'], ['asc'])
      }
    })
    return tree
  }
  this.copy = function (item) {
    var _temp = {
      children: []
    }
    _temp[this.treeKey] = item[this.key]
    for (var _index in item) {
      if (_index !== this.key && _index !== this.parentKey) {
        var _property = item[_index]
        if ((!!this.map) && this.map[_index]) {
          _temp[this.map[_index]] = _property
        } else {
          _temp[_index] = _property
        }
      }
    }
    return _temp
  }
}

export function formatDate (date, format) {
  if (!format) {
    format = 'yyyy-MM-dd hh:mm:ss'
  }
  let o = {
    'M+': date.getMonth() + 1, // month
    'd+': date.getDate(), // day
    'H+': date.getHours() < 10 ? '0' + date.getHours() : date.getHours(), // hour
    'h+': date.getHours() < 10 ? '0' + date.getHours() : date.getHours(), // hour
    'm+': date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(), // minute
    's+': date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds(), // second
    'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
    'S': date.getMilliseconds()
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return format
}

export function getDateStr (dateTimeStamp) {
  var result
  var minute = 1000 * 60
  var hour = minute * 60
  var day = hour * 24
  var month = day * 30
  var now = new Date().getTime()
  var diffValue = now - dateTimeStamp
  if (diffValue < 0) { 
    result = ''
  } else {
    var monthC = diffValue / month
    var weekC = diffValue / (7 * day)
    var dayC = diffValue / day
    var hourC = diffValue / hour
    var minC = diffValue / minute
    if (monthC >= 1) {
      if (monthC <= 12) {
        result = '' + parseInt(monthC) + '月前'
      } else {  
        result = '' + parseInt(monthC / 12) + '年前'
      }
    } else if (weekC >= 1) {   
      result = '' + parseInt(weekC) + '周前'
    } else if (dayC >= 1) {
      result = '' + parseInt(dayC) + '天前'
    } else if (hourC >= 1) {
      result = '' + parseInt(hourC) + '小时前'
    } else if (minC >= 1) {
      result = '' + parseInt(minC) + '分钟前'
    } else {
      result = '刚刚'
    } 
  }   
  return result
}
