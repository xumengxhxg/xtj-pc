<template>
    <div>
        <el-upload
        :header="header"
        class="avatar-uploader"l
        :action="action"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :on-error="handleAvatarError"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        imageUrl: '',
        header:{
            token:localStorage.token
        },
        action:location.origin
      };
    },
    created() {
        console.log(location.origin)
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.$emit('imgUpload',file.raw)
      },
      handleAvatarError(res, file) {
        this.$message.error(res);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
  }
</script>
<style >
    /* .avatar-uploader>div{
      border: 1px dashed #ccc !important;
    } */
    .avatar-uploader .el-upload {
      border: 1px dashed #ccc!important;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 102px;
      height: 102px;
      line-height: 102px!important;
      text-align: center;
    }
    .avatar {
      width: 102px;
      height: 102px;
      display: block;
    }
  </style>