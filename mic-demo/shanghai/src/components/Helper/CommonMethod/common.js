/** 公共方法 */
import moment from 'moment';
import { Modal } from 'iview';

export default {
    /**
     * 在深层数据结构中取值（为了替代类似 res && res.data && res.data.content这种写法）
     * @param {Object} obj [必填-需要取值的目标对象（例：res）]
     * @param {String} path [必填-数据结构路径（例：'data.content'）]
     * @param {Any} defaultValue [可选-如果取不到值则默认返回该值]
     */
    confirm(obj, path, defaultValue = null) {
        if (!obj || typeof(obj) != 'object' || !path || typeof(path) != 'string') return;
        const reducer = (accumulator, currentValue) =>
            (accumulator && accumulator[currentValue]) ?
            accumulator[currentValue] :
            defaultValue;

        path = path.split('.');
        return path.reduce(reducer, obj);
    },
    /**
     *  -----  柯里化版本 （为了不再重复输入obj这个参数） -----
     * 在深层数据结构中取值（为了替代类似 res && res.data && res.data.content这种写法）
     * @param {Object} obj [必填-需要取值的目标对象（例：res）]
     */
    confirm_currying(obj) {
        if (!obj || typeof(obj) != 'object') return;
        return (path, defaultValue = null) => {
            if (!path || typeof(path) != 'string') return;
            const reducer = (accumulator, currentValue) =>
                (accumulator && accumulator[currentValue]) ?
                accumulator[currentValue] :
                defaultValue;
            path = path.split('.');
            return path.reduce(reducer, obj);
        }
    },

    /**
     * 转换为金钱格式(千分位且保留两位小数)
     * @param {Number | String} num [需转换的数字或字符串]
     */
    toMoney(num) {
        if (!num) {
            return 0.00;
        }
        num = this.toFloat(num).toFixed(2);
        const arr = num.toString().split('.');
        let int = (arr[0] || 0).toString(),
            result = '';
        while (int.length > 3) {
            result = ',' + int.slice(-3) + result;
            int = int.slice(0, int.length - 3);
        }
        if (int) {
            result = int + result;
        }
        return `${result}.${arr[1]}`;
    },
    /**
      *付和押几 数字转为汉字 0表示自定义
      @param {String} str 【需转换的字符串】
    */
    numToChn(str) {
        if (!str) return '';
        switch (str) {
            case '0':
                return '自定义';
                break;
            case '1':
                return '一';
                break;
            case '2':
                return '二';
                break;
            case '3':
                return '三';
                break;
            case '4':
                return '四';
                break;
            case '5':
                return '五';
                break;
            case '6':
                return '六';
                break;
            case '7':
                return '七';
                break;
            case '8':
                return '八';
                break;
            case '9':
                return '九';
                break;
            case '10':
                return '十';
                break;
            case '11':
                return '十一';
                break;
            case '12':
                return '十二';
                break;
            default:
                return '';
        }
    },
    /**
     * 将字符串转换为保留两位小数的浮点数
     * @param {String} str [需转换的字符串]
     */
    toFloat(str) {
        if (!str) return 0.00;
        str = str.toString();
        const num = Number.parseFloat(str.replace(/,/g, ''));
        return Math.round(num * 100) / 100;
    },

    /**
     * 手机号码校验
     * @param {String} num [需校验的手机号码]
     */
    checkPhone(num) {
        if (!num) return false;
        const filter = /^1[3-9][0-9]{9}$/;
        return filter.test(num);
    },

    /**
     * 固定电话号码校验
     * @param {String} num [需校验的固话]
     */
    checkTel(num) {
        if (!num) return false;
        const filter = /^(?:0[1-9][0-9]{1,2}-)?[2-8][0-9]{6,7}$/;
        return filter.test(num);
    },

    /**
     * 身份证号码校验
     * @param {String} num [需校验的身份证号码]
     */
    checkID(num) {
        if (!num) return false;
        const filter = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/;
        return filter.test(num);
    },

    /**
     * 数字校验(整数或者小数)
     * @param {String} num [需校验的数字]
     */
    checkNumber(num) {
        if (!num && num != 0) return false;
        const filter = /^[0-9]+\.{0,1}[0-9]{0,2}$/;
        return filter.test(num);
    },

    /**
     * 文本校验(只能为中文、英文、数字组合，不允许其他特殊符号)
     * @param {String} txt [需校验的文本]
     */
    checkContent(txt) {
        const filter = /^[\u4E00-\u9FA5A-Za-z0-9]+$/;
        return filter.test(txt);
    },
    /**校验（英文字母或者数字）
     *
     */
    checkSubarea(txt) {
        const filter = /^[A-Za-z0-9]+$/;
        return filter.test(txt);
    },
    /**
     *
     *
     * @param {*} val
     * @param {*} arrList
     * @returns
     */
    filterLabel(val, arrList) {
        for (let i in arrList) {
            if (i.value == val) {
                return i.label;
            }
        }
    },

    /**
     * 匹配租约状态字段返回文字和颜色
     * @param {String} status [租约状态]
     */
    transformLeaseStatus(status) {
        switch (status) {
            case '0':
                return {
                    txt: '未租',
                    color: 'magenta',
                }
            case '1':
                return {
                    txt: '租约待确认',
                    color: 'volcano',
                }
            case '2':
                return {
                    txt: '签约成功',
                    color: 'lime',
                }
            case '3':
                return {
                    txt: '租约作废',
                    color: 'red',
                }
            case '4':
                return {
                    txt: '退房未结清',
                    color: 'orange',
                }
            case '5':
                return {
                    txt: '退房已结清',
                    color: 'green',
                }
            case '6':
                return {
                    txt: '续约待确认',
                    color: 'yellow',
                }
            case '7':
                return {
                    txt: '续约成功',
                    color: 'cyan',
                }
            case '8':
                return {
                    txt: '第三方租约',
                    color: 'blue',
                }
            case '9':
                return {
                    txt: '已拒签',
                    color: 'purple',
                }
            case '10':
                return {
                    txt: '租约逾期',
                    color: 'magenta',
                }
            default:
                return {
                    txt: '',
                    color: 'default',
                };
        };
    },

    /**
     * 匹配审核状态字段
     * @param {String} status [审核状态]
     */
    transformCheckStatus(status) {
        switch (status) {
            case '0':
                return '草稿';
            case '1':
                return '新增审批中';
            case '2':
                return '修改审批中';
            case '3':
                return '作废审批中';
            case '4':
                return '运营审批中';
            case '5':
                return '审核通过';
            case '6':
                return '审核撤回';
            case '7':
                return '审核驳回';
            case '8':
                return '取消运营审批中';
            default:
                return '';
        }
    },


    /**
     * 匹配报修列表的状态字段返回文字和颜色
     * @param {String} status [报修状态]
     */
    transformRepairStatus(status) {
        switch (status) {
            case '0':
                return {
                    txt: '待处理',
                    color: 'magenta',
                }
            case '1':
                return {
                    txt: '处理中',
                    color: 'volcano',
                }
            case '2':
                return {
                    txt: '已处理',
                    color: 'lime',
                }
            default:
                return {
                    txt: '暂无',
                    color: 'default',
                };
        };
    },

    /**
     * 匹配收款状态字段返回文字和颜色
     * @param {String} status [收款状态]
     */
    transformCheckinStatus(status) {
        switch (status) {
            case '0':
                return {
                    txt: '待收款',
                    color: 'gold',
                };
            case '1':
                return {
                    txt: '未收款',
                    color: 'orange',
                };
            case '2':
                return {
                    txt: '已收款',
                    color: 'green',
                };
            case '3':
                return {
                    txt: '欠费',
                    color: 'red',
                };
            case '4':
                return {
                    txt: '已取消',
                    color: 'default'
                };
            default:
                return {
                    txt: '已退房结算',
                    color: 'default',
                };
        };

    },

    /*交易流水用*/
    //进出账
    inOroutText(value) {
        if (value == 'in') {
            return '进账'
        } else if (value == 'out') {
            return '出账'
        }
    },
    //方式
    paywayTex(value, array) {
        for (let i in array) {
            if (array[i].value == value) {
                return array[i].label;
            }
        }
    },
    //string array string string
    matchArray(value, array, matchName, returnName) {

        for (let i in array) {
            if (array[i][matchName] == value) {
                return array[i][returnName];
            }
        }
        return '无'
    },
    //状态
    statusTex(status) {
        if (status) {
            return '已核销'
        } else {
            return '待核销'
        }
    },
    feeText(value) {
        if (value == '0') {
            return '租约流水'
        } else if (value == '1') {
            return '记账本流水'
        }
    },
    //改时间格式
    changeDate(date) {
        if (!date) {
            return ''
        }
        return moment(date).format('YYYY-MM-DD')
    },



    /**
     * 匹配付款状态字段返回文字和颜色
     * @param {String} status [付款状态]
     */
    transformCheckoutStatus(status) {
        switch (status) {
            case '0':
                return {
                    txt: '待付款',
                    color: 'gold',
                };
            case '1':
                return {
                    txt: '未付款',
                    color: 'orange',
                };
            case '2':
                return {
                    txt: '已付款',
                    color: 'green',
                };
            case '3':
                return {
                    txt: '欠费',
                    color: 'red',
                };
            default:
                return {
                    txt: '',
                    color: 'default',
                };
        };
    },
    /** 截取详细地址的省市区 */
    sliceAddress(address) {
        if (!address.indexOf('省')) {
            let index = address.indexOf('市');
            return address.substr(0, index + 1);
        } else {
            let indexPro = address.indexOf('省');
            let temp = address.slice(indexPro + 1);
            let index = temp.indexOf('市');
            return temp.substr(0, index + 1);
        }
    },
    /** 修改为null字段的显示 */
    returnName(string, showName) {
        if (string == null || string == undefined) return showName;
        return string;
    },
    returnCheckName(string, showName, elesName) {
        if (string == null || string == undefined) return showName;
        return elesName;
    },
    /**
     * 接收带时分秒的时间格式，返回去掉时分秒的时间格式
     * @param {String} val
     */
    strTime(val) {
        if (val === undefined || val == null) return;
        val = val.toString();
        if (val == null || val == '') {
            return ''
        } else {
            return val.slice(0, val.indexOf(' '));
        }
    },

    //改时间格式
    changeDate(date) {
        if (!date) { return '暂无' }
        return moment(date).format('YYYY-MM-DD')
    },
    //房源/承租人（业主）
    roomAndPerson(obj) {
        if (obj.roomName) {
            if (obj.roomRelationPeople == null || obj.roomRelationPeople == '') {
                return obj.roomName;
            }
            //有房源
            return obj.roomName + '/' + obj.roomRelationPeople;
        } else {
            return '无房源' + '/' + obj.roomRelationPeople;
        }
    },
    /**
     * 判断对象是否为空。这些都是空对象：string类型去掉首尾空格后是空字符串、undefined、null、
     * Array长度为0、json对象没有任何 属性-值 对、number类型小于等于0、boolean类型值是false
     * @param {Object} val [待判断对象]
     * @returns {boolean} true - 空对象、false - 不是空对象
     */
    isBlank(val) {
        let flag = false,
            sType = typeof val;
        if ('undefined' == sType) {
            flag = true;
        } else if ('object' == sType) {
            if (null == val) {
                flag = true;
            } else if (Array == val.constructor) {
                if (!val.length) {
                    flag = true;
                }
            } else {
                let hasLoop = false;
                for (let key in val) {
                    key;
                    hasLoop = true;
                    break;
                }
                flag = !hasLoop;
            }
        } else if ('string' == sType && '' == val.trim()) {
            flag = true;
        } else if ('number' == sType && 0 >= val) {
            flag = true;
        } else if ('boolean' == sType && !val) {
            flag = true;
        }
        return flag;
    },

    /**
     * 转化并modal显示导入excel文件后的返回报文
     * @param {String} data 返回的msg
     */
    handleUploadResponse(data) {
        const { res, detail } = (JSON.parse(data)).data.content;
        let summary = res.split(';'),
            detailContent = [];
        if (detail.length > 0) {
            detailContent = detail.map(item => `<p>${item}</p>`);
        }
        summary = summary.map(item => `<h4>${item}</h4>`);
        Modal.info({
            title: '导入结果',
            content: `
          ${summary.join('')}
        <div style="max-height: 200px; overflow-y: auto;">
          ${detailContent.join('')}
        </div>`,
        })
    },

    /**
     * 匹配资产类型
     * @param {String} type
     */
    switchAssetType(type) {
        switch (type) {
            case '0':
                return '公租房';
            case '1':
                return '国有公房';
            case '2':
                return '人才公寓';
            case '3':
                return '普通住房';
            case '4':
                return '商铺';
            case '5':
                return '商务办公';
            default:
                return '未知';
        }
    },
    /**修改提示
     * @param {String} test
     */
    editNull(string) {
        if (string === undefined || string == '' || string == null) {
            return '无'
        } else {
            return string;
        }
    }

}