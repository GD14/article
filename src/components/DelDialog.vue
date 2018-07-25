<template>
    <div id="del-dialog">
        <div>
            <div class="delDialogItem">
                <!-- 遮罩 -->
                <div></div>
                <!-- 对话框 -->
                <div>
                    <!-- 提示语 -->
                    <div class="delDialogMsg">确认删除文集<<{{msg}}>>,文章将会被移动到回收站</div>
                    <!-- 按钮 -->
                    <div class="delBtnGroup">
                        <button disabled="disabled">
                            <span>取消</span>
                        </button>
                        <button class="confirmBtn" v-on:click="onConfirmBtn">
                            <span>确认</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    props: {
        msg: {
            required: true
        }
    },
    methods:{
        onConfirmBtn:function(){
            this.$emit("onConfirmBtn")
        }
    }
}
</script>

<style>
#del-dialog {
    position: fixed;
    overflow: auto;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 1050;
    outline: 0;
}
.delDialogItem {
    position: absolute;
    top: 50%;
    left: 50%;
    background-color: #fff;
    width: 312px;
    border: 0;
    border-radius: 6px;
    margin: 0 auto 24px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}
.delDialogMsg {
    font-size: 13px;
    line-height: 20px;
    padding: 30px 30px 20px;
    color: black;
}

.delBtnGroup {
    padding: 0 16px 16px;
    text-align: right;
    border-radius: 0 0 2px 2px;
}
.delBtnGroup button {
    cursor: pointer;
    position: relative;
    display: inline-block;
    text-align: center;
    height: 30px;
    line-height: 20px;
    padding: 4px 12px;
    border: 1px solid transparent;
    background-color: #fff;
    border-radius: 15px;
    user-select: none;
    font-weight: 500;
    color: black;
}
button.confirmBtn {
    color: #42c02c;
    border-color: #42c02c;
}
</style>
