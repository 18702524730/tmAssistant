export default class Touches {
	static constructor() {

	}

	static _getIndex(e) {  // 获取滑动列表的下标值
		return e.currentTarget.dataset.index
	}

	static _getMoveX(e, startX) {  // 获取滑动过程中滑动的距离
		return this.getClientX(e) - startX
	}

	static _getEndX(e, startX) {  // 获取滑动结束滑动的距离
		let touch = e.changedTouches
		if (touch.length === 1) {
			return touch[0].clientX - startX
		}
	}

	static _resetData(dataList, name) {  // 重置数据， 把所有的列表 left 置为 0
		for (let i in dataList) {
			dataList[i][name] = 0
		}
		return dataList
	}

	static getClientX(e) {  // 获取滑动的横坐标
		let touch = e.touches
		if (touch.length === 1) {
			return touch[0].clientX
		}
	}

	static touchM(e, dataList, startX) {  // touchmove 过程中更新列表数据
		let list = this._resetData(dataList, 'left')
		list[this._getIndex(e)].left = this._getMoveX(e, startX)
		return list
	}

	static touchE(e, dataList, startX, width) {  // touchend 更新列表数据
		let list = this._resetData(dataList, 'left')
		let disX = this._getEndX(e, startX)
		let left = 0

		if (disX < 0) {  // 判断滑动方向， （向左滑动）
			// 滑动的距离大于删除宽度的一半就显示操作列表 否则不显示
			left = Math.abs(disX) > width / 2 ? -width : 0
		} else {  // 向右滑动复位
			left = 0
		}
		console.log(left)
		list[this._getIndex(e)].left = left
		return list
	}

	static askDeleteItem(e, dataList) {  // 询问删除
		let list = this._resetData(dataList, 'delYes');
		list[this._getIndex(e)].delYes = 1;
		return dataList
	}

	static deleteItem(e, dataList) {  // 删除功能
		dataList.splice(this._getIndex(e), 1)
		return dataList
	}

	static editItem(e, dataList) {  // 编辑数量
		let list = this._resetData(dataList, 'isEdit');
		list[this._getIndex(e)].isEdit = 1;
		return dataList
	}

	static operComplete(e, dataList, name, value) {  // 编辑数量
		let list = this._resetData(dataList, 'isEdit');
		list[this._getIndex(e)][name] = value;
		return dataList
	}


}

