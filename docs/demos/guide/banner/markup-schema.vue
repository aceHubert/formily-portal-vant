<template>
  <Banner></Banner>
</template>

<script>
import { Banner } from '@lj-portal/vant'

export default {
  name: 'Banner',
  components: { Banner },
  data() {
    return {
      dataSource: [
        {
          key: 1,
          linkUrl: 'https://www.baidu.com',
          imageUrl:
            '//res.ihealthinkcare.com/image/cp-banners-74d712532b56266787e6a9e74eb56d94.jpg',
        },
        {
          key: 2,
          imageUrl:
            '//res.ihealthinkcare.com/image/cp-banners-8db6d16fb5ee8ce3bc74a69421a88423.jpg',
        },
      ],
    }
  },
}
</script>
