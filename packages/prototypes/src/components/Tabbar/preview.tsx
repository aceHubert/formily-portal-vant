import { createBehavior, createResource } from '@designable/core'
import { Tabbar as FormilyTabbar } from '@formily-portal/vant'
import { composeExport } from '@formily-portal/vant/esm/__builtins__'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import { createFieldSchema } from '../Field'
import './styles.less'

export const Tabbar = composeExport(FormilyTabbar, {
  Behavior: createBehavior({
    name: 'Tabbar',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Tabbar',
    designerProps: {
      droppable: true,
      allowDrop(parent) {
        // 只允许在顶层的第一位并只能添加一次
        return (
          parent.isRoot &&
          !parent.children.some(
            (node) => node.props['x-component'] === 'Tabbar'
          )
        )
      },
      propsSchema: createFieldSchema(AllSchemas.Tabbar),
    },
    designerLocales: AllLocales.Tabbar,
  }),
  Resource: createResource({
    icon: (
      <g
        id="页面-1"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <g id="底部栏" fill-rule="nonzero">
          <rect
            id="矩形"
            fill="#FFFFFF"
            opacity="0"
            x="0"
            y="0"
            width="1024"
            height="1024"
          ></rect>
          <path
            d="M944,0 C988.18278,0 1024,35.81722 1024,80 L1024,944 C1024,988.18278 988.18278,1024 944,1024 L80,1024 C35.81722,1024 0,988.18278 0,944 L0,80 C0,35.81722 35.81722,0 80,0 L944,0 Z M944,20 L80,20 C47.1942859,20 20.5378857,46.328343 20,79.0077903 L20,80 L20,944 C20,976.805714 46.328343,1003.46211 79.0077903,1004 L80,1004 L944,1004 C976.805714,1004 1003.46211,977.671657 1004,944.99221 L1004,944 L1004,80 C1004,47.1942859 977.671657,20.5378857 944.99221,20 L944,20 Z"
            id="形状"
            fill="#999999"
          ></path>
          <rect
            id="矩形备份-16"
            fill="#1890FF"
            transform="translate(197.000000, 825.000000) scale(-1, 1) rotate(-90.000000) translate(-197.000000, -825.000000) "
            x="142"
            y="770"
            width="110"
            height="110"
            rx="10"
          ></rect>
          <rect
            id="矩形备份-17"
            fill="#1890FF"
            transform="translate(407.000000, 825.000000) scale(-1, 1) rotate(-90.000000) translate(-407.000000, -825.000000) "
            x="352"
            y="770"
            width="110"
            height="110"
            rx="10"
          ></rect>
          <rect
            id="矩形备份-18"
            fill="#1890FF"
            transform="translate(827.000000, 825.000000) scale(-1, 1) rotate(-90.000000) translate(-827.000000, -825.000000) "
            x="772"
            y="770"
            width="110"
            height="110"
            rx="10"
          ></rect>
          <rect
            id="矩形备份-19"
            fill="#1890FF"
            transform="translate(617.000000, 825.000000) scale(-1, 1) rotate(-90.000000) translate(-617.000000, -825.000000) "
            x="562"
            y="770"
            width="110"
            height="110"
            rx="10"
          ></rect>
          <rect
            id="矩形备份-13"
            fill="#999999"
            transform="translate(512.000000, 682.000000) scale(-1, 1) rotate(-90.000000) translate(-512.000000, -682.000000) "
            x="502"
            y="274"
            width="20"
            height="816"
            rx="10"
          ></rect>
          <path
            d="M172.34986,577.168716 L172.620181,577.258187 C177.599318,578.983667 182.847281,579.913271 188.23012,579.994215 L189,580 L205.437611,580 C210.960458,580 215.437611,584.477153 215.437611,590 C215.437611,595.522847 210.960458,600 205.437611,600 L189,600 C181.111037,600 173.386842,598.690741 166.071419,596.155639 C160.853031,594.347249 158.088683,588.650919 159.897073,583.432532 C161.674285,578.304117 167.206524,575.545848 172.34986,577.168716 Z M120.911731,546.306637 C119.629258,540.934756 122.944378,535.540336 128.316259,534.257863 C133.68814,532.97539 139.08256,536.29051 140.365033,541.662391 C141.661799,547.094138 143.861846,552.245263 146.862048,556.928348 C149.841292,561.578719 148.486576,567.763744 143.836205,570.742988 C139.185834,573.722232 133.000809,572.367516 130.021565,567.717145 C125.818,561.155702 122.731489,553.929037 120.911731,546.306637 Z M119,484.109403 C119,478.586555 123.477153,474.109403 129,474.109403 C134.522847,474.109403 139,478.586555 139,484.109403 L139,504.109403 C139,509.63225 134.522847,514.109403 129,514.109403 C123.477153,514.109403 119,509.63225 119,504.109403 L119,484.109403 Z M119,424.109403 C119,418.586555 123.477153,414.109403 129,414.109403 C134.522847,414.109403 139,418.586555 139,424.109403 L139,444.109403 C139,449.63225 134.522847,454.109403 129,454.109403 C123.477153,454.109403 119,449.63225 119,444.109403 L119,424.109403 Z M119,364.109403 C119,358.586555 123.477153,354.109403 129,354.109403 C134.522847,354.109403 139,358.586555 139,364.109403 L139,384.109403 C139,389.63225 134.522847,394.109403 129,394.109403 C123.477153,394.109403 119,389.63225 119,384.109403 L119,364.109403 Z M119,304.109403 C119,298.586555 123.477153,294.109403 129,294.109403 C134.522847,294.109403 139,298.586555 139,304.109403 L139,324.109403 C139,329.63225 134.522847,334.109403 129,334.109403 C123.477153,334.109403 119,329.63225 119,324.109403 L119,304.109403 Z M119,244.109403 C119,238.586555 123.477153,234.109403 129,234.109403 C134.522847,234.109403 139,238.586555 139,244.109403 L139,264.109403 C139,269.63225 134.522847,274.109403 129,274.109403 C123.477153,274.109403 119,269.63225 119,264.109403 L119,244.109403 Z M125.417428,180.686467 C127.732442,175.672232 133.673972,173.484081 138.688207,175.799095 C143.61599,178.074195 145.8143,183.851837 143.691314,188.809714 L143.575579,189.069874 C141.358757,193.871431 139.917309,199.005596 139.317687,204.324241 L139.237761,205.085286 C138.702795,210.582163 133.81302,214.604586 128.316143,214.06962 C122.819266,213.534654 118.796843,208.644879 119.331809,203.148002 C120.093981,195.316544 122.159392,187.743252 125.417428,180.686467 Z M179.361675,140.659341 C184.832747,139.904877 189.879541,143.728444 190.634004,149.199516 C191.375681,154.577858 187.693199,159.546182 182.370586,160.429803 L182.09383,160.471845 C176.542365,161.237395 171.209416,162.924802 166.271052,165.450382 C161.353933,167.965097 155.329242,166.017564 152.814527,161.100446 C150.299812,156.183327 152.247345,150.158636 157.164463,147.643921 C164.090823,144.101639 171.577421,141.732794 179.361675,140.659341 Z M847.665503,141.335152 C853.083112,142.408161 856.605107,147.669847 855.532098,153.087456 C854.459089,158.505066 849.197403,162.027061 843.779793,160.954052 C840.586256,160.321542 837.316649,160 834,160 L825.781195,160 C820.258347,160 815.781195,155.522847 815.781195,150 C815.781195,144.477153 820.258347,140 825.781195,140 L834,140 C838.622981,140 843.193981,140.449524 847.665503,141.335152 Z M899.211408,184.510287 C901.223155,189.653702 898.684436,195.454107 893.541021,197.465854 C888.486285,199.442915 882.79702,197.025071 880.692866,192.059173 L880.585454,191.795467 C878.555623,186.605815 875.664367,181.793789 872.044456,177.554132 C868.458282,173.353989 868.956003,167.041932 873.156147,163.455758 C877.35629,159.869585 883.668347,160.367306 887.25452,164.567449 C892.317587,170.497336 896.365782,177.2349 899.211408,184.510287 Z M904,247.671792 C904,253.194639 899.522847,257.671792 894,257.671792 C888.477153,257.671792 884,253.194639 884,247.671792 L884,227.671792 C884,222.148944 888.477153,217.671792 894,217.671792 C899.522847,217.671792 904,222.148944 904,227.671792 L904,247.671792 Z M904,307.671792 C904,313.194639 899.522847,317.671792 894,317.671792 C888.477153,317.671792 884,313.194639 884,307.671792 L884,287.671792 C884,282.148944 888.477153,277.671792 894,277.671792 C899.522847,277.671792 904,282.148944 904,287.671792 L904,307.671792 Z M904,367.671792 C904,373.194639 899.522847,377.671792 894,377.671792 C888.477153,377.671792 884,373.194639 884,367.671792 L884,347.671792 C884,342.148944 888.477153,337.671792 894,337.671792 C899.522847,337.671792 904,342.148944 904,347.671792 L904,367.671792 Z M904,427.671792 C904,433.194639 899.522847,437.671792 894,437.671792 C888.477153,437.671792 884,433.194639 884,427.671792 L884,407.671792 C884,402.148944 888.477153,397.671792 894,397.671792 C899.522847,397.671792 904,402.148944 904,407.671792 L904,427.671792 Z M904,487.671792 C904,493.194639 899.522847,497.671792 894,497.671792 C888.477153,497.671792 884,493.194639 884,487.671792 L884,467.671792 C884,462.148944 888.477153,457.671792 894,457.671792 C899.522847,457.671792 904,462.148944 904,467.671792 L904,487.671792 Z M900.996647,550.338904 C899.393966,555.624096 893.810242,558.609362 888.525049,557.006681 C883.329436,555.431164 880.356448,550.008411 881.779723,544.804058 L881.857272,544.535083 C883.272433,539.868279 884,534.988616 884,530 L884,527.671792 C884,522.148944 888.477153,517.671792 894,517.671792 C899.522847,517.671792 904,522.148944 904,527.671792 L904,530 C904,536.96042 902.980886,543.79544 900.996647,550.338904 Z M852.922309,597.409852 C847.604294,598.900008 842.085181,595.796916 840.595025,590.478901 C839.130126,585.251022 842.104091,579.828804 847.257488,578.23084 L847.525976,578.151617 C852.654319,576.714608 857.503003,574.463533 861.90624,571.495235 L862.532225,571.066324 C867.064479,567.910295 873.297064,569.025946 876.453093,573.5582 C879.609122,578.090454 878.493472,584.323038 873.961218,587.479067 C867.564156,591.933653 860.460941,595.297458 852.922309,597.409852 Z M622.109403,580 C627.63225,580 632.109403,584.477153 632.109403,590 C632.109403,595.429239 627.782732,599.847932 622.389308,599.996158 L622.109403,600 L602.109403,600 C596.586555,600 592.109403,595.522847 592.109403,590 C592.109403,584.477153 596.586555,580 602.109403,580 L622.109403,580 Z M782.109403,600 C776.586555,600 772.109403,595.522847 772.109403,590 C772.109403,584.477153 776.586555,580 782.109403,580 L802.109403,580 C807.63225,580 812.109403,584.477153 812.109403,590 C812.109403,595.522847 807.63225,600 802.109403,600 L782.109403,600 Z M542.109403,600 C536.586555,600 532.109403,595.522847 532.109403,590 C532.109403,584.477153 536.586555,580 542.109403,580 L562.109403,580 C567.63225,580 572.109403,584.477153 572.109403,590 C572.109403,595.522847 567.63225,600 562.109403,600 L542.109403,600 Z M722.109403,600 C716.586555,600 712.109403,595.522847 712.109403,590 C712.109403,584.477153 716.586555,580 722.109403,580 L742.109403,580 C747.63225,580 752.109403,584.477153 752.109403,590 C752.109403,595.522847 747.63225,600 742.109403,600 L722.109403,600 Z M482.109403,600 C476.586555,600 472.109403,595.522847 472.109403,590 C472.109403,584.477153 476.586555,580 482.109403,580 L502.109403,580 C507.63225,580 512.109403,584.477153 512.109403,590 C512.109403,595.522847 507.63225,600 502.109403,600 L482.109403,600 Z M662.109403,600 C656.586555,600 652.109403,595.522847 652.109403,590 C652.109403,584.477153 656.586555,580 662.109403,580 L682.109403,580 C687.63225,580 692.109403,584.477153 692.109403,590 C692.109403,595.522847 687.63225,600 682.109403,600 L662.109403,600 Z M422.109403,600 C416.586555,600 412.109403,595.522847 412.109403,590 C412.109403,584.477153 416.586555,580 422.109403,580 L442.109403,580 C447.63225,580 452.109403,584.477153 452.109403,590 C452.109403,595.522847 447.63225,600 442.109403,600 L422.109403,600 Z M362.109403,600 C356.586555,600 352.109403,595.522847 352.109403,590 C352.109403,584.477153 356.586555,580 362.109403,580 L382.109403,580 C387.63225,580 392.109403,584.477153 392.109403,590 C392.109403,595.522847 387.63225,600 382.109403,600 L362.109403,600 Z M242.109403,600 C236.586555,600 232.109403,595.522847 232.109403,590 C232.109403,584.477153 236.586555,580 242.109403,580 L262.109403,580 C267.63225,580 272.109403,584.477153 272.109403,590 C272.109403,595.522847 267.63225,600 262.109403,600 L242.109403,600 Z M302.109403,600 C296.586555,600 292.109403,595.522847 292.109403,590 C292.109403,584.477153 296.586555,580 302.109403,580 L322.109403,580 C327.63225,580 332.109403,584.477153 332.109403,590 C332.109403,595.522847 327.63225,600 322.109403,600 L302.109403,600 Z M245.671792,140 C251.194639,140 255.671792,144.477153 255.671792,150 C255.671792,155.522847 251.194639,160 245.671792,160 L225.671792,160 C220.148944,160 215.671792,155.522847 215.671792,150 C215.671792,144.477153 220.148944,140 225.671792,140 L245.671792,140 Z M305.671792,140 C311.194639,140 315.671792,144.477153 315.671792,150 C315.671792,155.522847 311.194639,160 305.671792,160 L285.671792,160 C280.148944,160 275.671792,155.522847 275.671792,150 C275.671792,144.477153 280.148944,140 285.671792,140 L305.671792,140 Z M365.671792,140 C371.194639,140 375.671792,144.477153 375.671792,150 C375.671792,155.522847 371.194639,160 365.671792,160 L345.671792,160 C340.148944,160 335.671792,155.522847 335.671792,150 C335.671792,144.477153 340.148944,140 345.671792,140 L365.671792,140 Z M425.671792,140 C431.194639,140 435.671792,144.477153 435.671792,150 C435.671792,155.522847 431.194639,160 425.671792,160 L405.671792,160 C400.148944,160 395.671792,155.522847 395.671792,150 C395.671792,144.477153 400.148944,140 405.671792,140 L425.671792,140 Z M485.671792,140 C491.194639,140 495.671792,144.477153 495.671792,150 C495.671792,155.522847 491.194639,160 485.671792,160 L465.671792,160 C460.148944,160 455.671792,155.522847 455.671792,150 C455.671792,144.477153 460.148944,140 465.671792,140 L485.671792,140 Z M665.671792,140 C671.194639,140 675.671792,144.477153 675.671792,150 C675.671792,155.522847 671.194639,160 665.671792,160 L645.671792,160 C640.148944,160 635.671792,155.522847 635.671792,150 C635.671792,144.477153 640.148944,140 645.671792,140 L665.671792,140 Z M545.671792,140 C551.194639,140 555.671792,144.477153 555.671792,150 C555.671792,155.522847 551.194639,160 545.671792,160 L525.671792,160 C520.148944,160 515.671792,155.522847 515.671792,150 C515.671792,144.477153 520.148944,140 525.671792,140 L545.671792,140 Z M725.671792,140 C731.194639,140 735.671792,144.477153 735.671792,150 C735.671792,155.522847 731.194639,160 725.671792,160 L705.671792,160 C700.148944,160 695.671792,155.522847 695.671792,150 C695.671792,144.477153 700.148944,140 705.671792,140 L725.671792,140 Z M605.671792,140 C611.194639,140 615.671792,144.477153 615.671792,150 C615.671792,155.522847 611.194639,160 605.671792,160 L585.671792,160 C580.148944,160 575.671792,155.522847 575.671792,150 C575.671792,144.477153 580.148944,140 585.671792,140 L605.671792,140 Z M785.671792,140 C791.194639,140 795.671792,144.477153 795.671792,150 C795.671792,155.522847 791.194639,160 785.671792,160 L765.671792,160 C760.148944,160 755.671792,155.522847 755.671792,150 C755.671792,144.477153 760.148944,140 765.671792,140 L785.671792,140 Z"
            id="形状结合"
            fill="#999999"
          ></path>
        </g>
      </g>
    ),
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string|number',
          enum: [
            {
              key: 1,
              icon: '//via.placeholder.com/100x100?text=H',
              text: 'Home',
              linkUrl: 'javascript:;',
            },
            {
              key: 2,
              icon: '//via.placeholder.com/100x100?text=M',
              text: 'Me',
              linkUrl: 'javascript:;',
              replace: true,
            },
          ],
          'x-component': 'Tabbar',
        },
      },
    ],
  }),
})
