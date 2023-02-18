## uni-app vue2 怎么封装可以v-model的组件

（1）定义props

在组件的props中定义value和v-model对应的变量

```javascript
props: { 
    value: {
    type: [String, Number]
  }
}
```

（2）初始化data

在组件的data中初始化v-model变量，并将value传入

```javascript
data() { 
    return {
    modelValue: this.value
  }
}
```

（3）v-model监听

给v-model变量添加监听，当v-model值发生变化时，将新值传出

```javascript
watch: {
  modelValue(val) {
    this.$emit('input', val);
  }}
```

（4）value监听

给value添加监听，当value值发生变化时，将新值传入v-model变量

```javascript
watch: {
  value(val) {    
      this.modelValue = val;
  }
}
```

（5）组件完成

组件完成后，可以通过v-model来控制组件的值，当组件内部的值发生变化时，也会触发v-model的变化