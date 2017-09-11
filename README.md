# tool

* just like the lodash and the underscore，it is a tool magazine.
* 类似精简版的lodash和underscore,是一个工具集

**use environment**

* browser and node 
* 浏览器和node

## DESCRIPTION

**PROPERTIES:**

---common---

> _.type(arg)

* get the typeof *arg*
* 判断类型

> _.extend(obj)

* add properties of *obj* to tool
* 往tool上挂载方法

> _.merge(target,obj,obj)

* add properties of all *obj* to *target*
* 把全部obj中的属性添加到*target*中

> _.keys(obj)

* get properties name of *obj*
* 获取*obj*的属性名

> _.equal(target,compare)

* compare the *target* and *compare*,use ===
* 比较*target* 和 *compare*,使用===判断

> _.noConflict()

* use to change tool name
* 用于更改tool名字

---array---

> _.isArray(sender)

* if *sender* is Array,return true
* 是否是数组

> _.isArrayLike(sender)

* if *sender* is ArrayLike , return true
* 是否是伪数组

> _.toArray(sender)

* make the *sender* that must be ArrayLike into Array
* 伪数组转换成数组

> _.forEach(arr,cb,ec)

* retrieve the *arr*
* 遍历sender中的所有元素，按顺序用遍历输出每个元素

> _.map(arr,cb,ec)

* retrieve the *arr* and yield a new array which passed
* 通过转换函数(cb迭代器)映射列表中的每个值产生价值的新数组

> _.filter(arr,cb,ec)

* retrieve the *arr* and yield a new array which cb return true
* 遍历sender中的每个值，返回包含所有通过cb真值检测的元素值

> _.reject(arr,cb,ec)

* retrieve the *arr* and yield a new array which cb return false
* 返回array中没有通过cb真值检测的元素集合，与filter相反。

> _.some(arr,cb,ec)

* return true while a cb return true
* 如果sender中有任何一个元素通过 cb 的真值检测就返回true。一旦找到了符合条件的元素, 就直接中断对sender的遍历.

> _.every(arr, cb, ec)

* return true while all cb return true 
* 如果array中的所有元素都通过cb的真值检测就返回true。

---event---

> let ev = _.event;

* get the event object
* 获取event对象实例

> ev.resume()

* resume the event queue
* 初始事件队列

> ev.on(name,cb)

* add the cb to event queue which name *name*
* 往名为*name*的事件队列中添加事件

> ev.emit('name')

* run the events 
* 执行事件

> ev.removeListener(name,cb)

* remove a cb of event queue
* 删除*name*队列中一个事件

> ev.removeAllListener(name)

* remove all cb of event queue
* 删除全部*name*队列中事件









