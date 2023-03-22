<template>
  <Banner></Banner>
</template>

<script>
import { Banner } from '@formily-portal/vant'

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
            '//via.placeholder.com/1920x300/FF0000/FFFFFF?text=Image1',
        },
        {
          key: 2,
          imageUrl:
            '//via.placeholder.com/1920x300/008000/FFFFFF?text=Image2',
        },
      ],
    }
  },
}
</script>
