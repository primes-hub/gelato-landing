const commonUtils = {
	formSubmit : function (_form, _required_selector = '') {

		if (this.validationForm(_form, _required_selector)) {
			_form.submit();
		}

		return false;
	},
	validationForm : function (_form, _required_selector = '') {
		/*
		* <select focus-selector=".sel-box.etc2" message="관심분야를 선택해주세요." req> 형태로 엘리멘트 작성
		*
		*
		* */
		if (!$(_form).length) {
			console.log("폼을 찾을 수 없습니다.");
			return false;
		}
		let chkBool = true;
		$(_form).find(_required_selector ?? '[required]').each(function () {

			let this_selector = $(this);
			let focus_selector = $(this).attr("focus-selector");
			this_selector = focus_selector ? $(focus_selector) : this_selector;


			let message = $(this).attr("message");
			if (!message) {
				if ($(this).attr("title")) {
					message = $(this).attr("title") + "을(를) 입력해 주세요.";
				} else if ($(this).attr("placeholder")) {
					message = $(this).attr("placeholder") + "을(를) 입력해 주세요.";
				} else {
					message = "필수 값을 확인해주세요.";
				}
			}

			if ($(this).prop("type") == "checkbox") {
				if (!$(this).prop("checked")) {

					alert(message);
					$(this_selector).focus();

					chkBool = false; // return 값을 false;
					return false;// 반복문 탈출
				}
			} else {
				if (!$(this).val()) {

					alert(message);
					$(this_selector).focus();

					chkBool = false; // return 값을 false;
					return false;// 반복문 탈출
				}
			}
		});

		return chkBool;
	},
	dtToDate : function (dt) {
		if (!dt)
			return '-';

		if (dt.constructor.toString().indexOf("Date") > -1) {
			return dt.toISOString().substring(0, 10);
		} else {
			var dtConverted = new Date(dt);
			if (dtConverted.constructor.toString().indexOf("Date") > -1) {
				return dtConverted.toISOString().substring(0, 10);
			}
		}
		return '';
	},
	nullToBlank : function (nullStr) {
		if (!nullStr)
			return '';

		return nullStr;
	},
	alert : function (title, msg, fn) {
		var dialog = new ax5.ui.dialog({
			title : '<i class="axi axi-ion-alert"></i> ' + title,
			onStateChanged : function () {
			}
		});
		dialog.setConfig({
			lang : {
				"ok" : "확인", "cancel" : "취소"
			}
		});
		dialog.alert({msg : msg}, fn);
	},
	confirm : function (title, msg, fn) {
		var dialog = new ax5.ui.dialog({
			title : '<i class="axi axi-ion-alert"></i> ' + title,
			onStateChanged : function () {
			}
		});
		dialog.setConfig({
			lang : {
				"ok" : "확인", "cancel" : "취소"
			}
		});
		dialog.confirm({msg : msg},
			function () {
				if (this.key == "ok") {
					fn();
				}
			});
	},
	modal : function (opt, htmlArr) {
		var modal = new ax5.ui.modal();
		var options = {
			closeToEsc : true,
			zIndex : 1000,
		};
		if (opt)
			options = $.extend(opt, options);
		/*
		width
		width of modal
		height
		height of modal
		position
		position of modal {left: "left|center|right|Number", top: "top|middle|bottom|Number", margin: "Number"}
		iframe
		Object that defines the modal body as "iframe" {method:"get|post", url:"String", param:"paramString|Object"}
		closeToEsc
		Whether to close the "ESC" key modal window
		animateTime
		Modal window animation of time required at the time of opening and closing, must be the same as the value of time, which is defined in the CSS. The default is 250
		onStateChanged
		Event function that occurs when a modal window state is changed
		zIndex
		CSS z-index Depth
		*/
		modal.open(options, function () {
			var modal_obj = this;

			var btn1 = $(
				'<div><button class="btn btn-default" type="button" style="margin-top: 0px; top:0; right: 0;">X</button></div>'
			);

			btn1.click(function () {
				modal.close();
			});

			modal_obj.$['body-frame'].append(btn1)

			if (htmlArr.length > 0) {
				$.each(htmlArr, function () {
					modal_obj.$["body-frame"].append($(this));
				})
			}
		});
	},
	showMaskOverlay : function (show_flag) {

		if ($('.common-overlay').length === 0) {
			var overlayHtmlArr = [];
			overlayHtmlArr.push('<div class="common-overlay">');
			overlayHtmlArr.push('	<div class="common-overlay__inner">');
			overlayHtmlArr.push('	</div>');
			overlayHtmlArr.push('	<div class="common-overlay__content"><img src="/images/common/h_logo.png" alt="loading"/></div>');
			overlayHtmlArr.push('</div>');

			$("body").append(overlayHtmlArr.join('\r\n'));
		}
		$('.common-overlay').toggle(show_flag)
	},
	fileOnChange : function (_obj) {
		var fileValue = $(_obj).val().split("\\");
		var fileName = fileValue[fileValue.length - 1]; // 파일명
		$(_obj).closest(".file-container").find(".common-file-text").val(fileName)

	},
	fileDeleteBtn : function (_obj, _file_id) {
		if (confirm("삭제 하시겠습니까?")) {
			if (_file_id) {
				let url = `/api/file/del/${_file_id}`;
				$.ajax({
					url : url,
					method : 'get',
					dataType : 'json',
					success : (re) => {
						console.log(re);
						if (re.result) {
							$(_obj).closest('.img-file-show').hide();
						}
					}
				})
			} else {
				commonUtils.alert("오류", "삭제중 오류가 발생했습니다.");
			}
		}
	},
	getDays : function (year, month) {
		return new Date(year, month, 0).getDate();
	},
	getVH : function (percent) {
		let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		return (percent * h) / 100;
	},
	getVW : function (percent) {
		let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		return (percent * w) / 100;
	},
	dollarFormat : function (_num) {
		try {
			const formatter = new Intl.NumberFormat('en-US', {
				style : 'currency',
				currency : 'USD',
			});
			return formatter.format(_num);
		} catch (e) {
			return ""
		}
	},
	wonFormat : function (_num) {
		try {
			const formatter = new Intl.NumberFormat('ko-KR');
			return formatter.format(_num) + "원";
		} catch (e) {
			console.log(e)
			return ""
		}
	},
	itcTxt : function (_txt) {
		let rtn_txt = _txt ? _txt : "";
		return rtn_txt.toString();
	},
	uiSelectMenu : function (_selector, _change_event) {
		try {
			$(_selector).selectmenu({
				change : function (e, u) {
					if (_change_event) {
						_change_event(e, u);
					} else {
						$(_selector).trigger("change")
					}
				}
			});
			return true;
		} catch (e) {
			return false;
		}
	},
	setCookie : function (name, value, expiredays) {
		var todayDate = new Date();
		todayDate.setDate(todayDate.getDate() + expiredays);
		document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";"
	},
	getCookie : function (name) {
		const match = document.cookie.match(new RegExp('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)'));
		return match ? decodeURIComponent(match[2]) : null;
	}
};

const userUtils = {
	preLeave : function (_user_id, _form_selector) {
		try {
			if (confirm("탈퇴하시면 다시 복구 할 수 없습니다. 정말 탈퇴하시겠습니까?")) {
				$(_form_selector ? _form_selector : "#user_leave_form").submit();
			}
			return true;
		} catch (e) {
			alert("오류가 발생했습니다.");
			return false;
		}
	}
};