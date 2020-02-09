/** 項目 */
var objFruitBoxList = []; // フルーツデータ

$(document).ready(function() {
	// 項目初期化
	init();
	// トリガーセット
	setTrigger();
});
/**
 * 項目初期化
 */
function init() {
	// フルーツリストをJSON形式に変換
	if ("" !== $("#fruitBoxList").val()) {
		objFruitBoxList = $.parseJSON(replaceDoubleQuotes($("#fruitBoxList").val()));
	}
	// formのフルーツリストにobjFruitBoxListを設定
	$("#fruitBoxList").val(JSON.stringify(objFruitBoxList));
	// フルーツテーブルレンダリング
	renderFruitTable();
}
/**
 * ボタンイベントセット
 */
function setTrigger() {
	// 追加ボタン押下イベント
	$("#BTN_addFruitBox").click(function() {
		// 単孔目チェック
		validateCheckAddFruitBox();
		// 追加
		addFruitBox();
	});
	// 新規有無確認ボタン押下イベント
	$("#BTN_checkNewFlag").click(function() {
		checkNewFlag();
	});
	// 発送状態確認ボタン押下イベント
	$("#BTN_checkSendStatus").click(function() {
		checkSendStatus();
	});
	// 登録日更新ボタン押下イベント(GET送信)
	$("#BTN_updateRegDateGet").click(function() {
		// 単項目チェック
		checkRegDateGet();
	});
	// 未発送押下イベント
	$("#yetSent").click(function() {
		$("#alreadySent").prop("checked", false);
	});
	// 発送済押下イベント
	$("#alreadySent").click(function() {
		$("#yetSent").prop("checked", false);
	});
	// 発送日更新ボタン押下イベント(POST送信)
	$("#BTN_updateSentDatePost").click(function() {
		// 単項目チェック
		checkSentDatePost();
	});
}
/**
 * 単項目チェック（追加時）
 */
function validateCheckAddFruitBox() {
	// 必須チェック
	if ("" === $("#boxName").val()) {
		window.alert("箱名は省略できません。");
		return false;
	}
	// 必須チェック
	if ("" === $("#boxNo").val()) {
		window.alert("箱番号は省略できません。");
		return false;
	}
}
/**
 * 追加
 */
function addFruitBox() {
	// 操作日付生成
	today = new Date();
	var regDate = today.getFullYear() + "年" + (today.getMonth() + 1) + "月" + today.getDate() + "日";

	// 追加用フルーツデータ生成
	var fruitData = {
		newFlag : true,
		boxName : $("#boxName").val(),
		boxNo : $("#boxNo").val(),
		regDate : regDate,
		sentDate : regDate
	}

	// 生成したフルーツデータを格納
	objFruitBoxList.push(fruitData);
	// formのフルーツリストにobjFruitBoxListを設定
	$("#fruitBoxList").val(JSON.stringify(objFruitBoxList));
	// フルーツテーブルレンダリング
	renderFruitTable();
	// 入力値クリア
	$("#boxName").val("");
	$("#boxNo").val("");
}
/**
 * 新規分有無チェック
 */
function checkNewFlag() {
	var isNew = false;
	// 新規分有無チェック
	$.each(objFruitBoxList, function(i, row) {
		if (row.newFlag) {
			isNew = true;
			return;
		}
	});
	if (isNew) {
		window.alert("新規分が存在しています。");
	} else {
		window.alert("新規分は存在していません。");
	}
}
/**
 * 発送状態チェック
 */
function checkSendStatus() {
	var sendStatusFlag = false;
	// 選択された箱名を取得
	var boxName = $("input[name='select']:checkbox:checked").parent().parent().find("td.boxName").text();
	// 選択された箱を取得
	$.each(objFruitBoxList, function(i, rowa) {
		if (boxName === rowa.boxName) {
			$.each(rowa.fruitList, function(i, rowb) {
				// 発送済があればtrue
				if ("発送済" === rowb.sendStatusCd) {
					sendStatusFlag = true;
					return;
				}
			});
		}
	});
	if (sendStatusFlag) {
		window.alert("発送済があります。");
	} else {
		window.alert("発送済がありません。");
	}
}
/**
 * 登録日コピー
 */
function copyRegDate() {
	// 選択された行の年月日をコピーする
	$($("input[name='select']:checkbox:checked").get()).each(function() {
		$("#inputRegDateYear").val($(this).parent().parent().find("td.hdnRegDateYear").text());
		$("#inputRegDateMonth").val($(this).parent().parent().find("td.hdnRegDateMonth").text());
		$("#inputRegDateDay").val($(this).parent().parent().find("td.hdnRegDateDay").text());
	});
}
/**
 * 単項目チェック（登録日更新GET）
 */
function checkRegDateGet() {
	// リクエストビーン生成
	requestBean = {
		regDateYear : $("#inputRegDateYear").val(),
		regDateMonth : $("#inputRegDateMonth").val(),
		regDateDay : $("#inputRegDateDay").val()
	}

	$.ajax({
		type : "GET",
		async : true,
		contentType : "application/json",
		url : contextPath + "/checkRegDateGet",
		data : {
			jsonRequestBean : JSON.stringify(requestBean)
		},
		dataType : 'json',
		timeout : 70000,
		success : function(data) {
			if (data.result === "NORMAL") {
				// 登録日更新
				updateRegDate();
			} else {
				alert("レスポンスエラー");
			}
		},
		error : function() {
			alert("Ajax通信エラー");
		}
	})
}
/**
 * 登録日更新
 * 登録日を入力された年月日で更新する
 * 新規分のもののみ更新する
 * 番号が同一の場合は、同一分全て更新する
 */
function updateRegDate() {
	// 登録日生成
	var inputtedRegDateYear = $("#regDateYear").val();		// 登録日-年
	var inputtedRegDateMonth = $("#regDateMonth").val();	// 登録日-月
	var inputtedRegDateDay = $("#regDateDay").val();		// 登録日-日
	var inputtedRegDate = inputtedRegDateYear + "年" + inputtedRegDateMonth + "月" + inputtedRegDateDay + "日"

	// 更新対象取得
	var boxName = $("input[name='select']:checkbox:checked").parent().parent().find("td.boxName").text();
	// 登録日生成
	$.each(objFruitBoxList, function(i, row) {
		// 新規分でない場合、スキップ
		if (!row.newFlag) {
			alert("新規分でないため、登録日は更新できません。");
			return false;
		}
		// 番号が同一の場合、日付更新
		if (boxName === row.boxName) {
			row.regDate = inputtedRegDate;
			row.regDateYear = inputtedRegDateYear;
			row.regDateMonth = inputtedRegDateMonth;
			row.regDateDay = inputtedRegDateDay;
		}
	});
	// formのフルーツリストにobjFruitBoxListを設定
	$("#fruitBoxList").val(JSON.stringify(objFruitBoxList));
	// フルーツテーブルレンダリング
	renderFruitTable();
}
/**
 * 単項目チェック（発送日更新POST）
 */
function checkSentDatePost() {
	// リクエストビーン生成
	var jsonRequestBean = {};

	var sentFlag = "";
	if ($("#yetSent").is(":checked")) {
		sentFlag = $("#yetSent").val();
	} else if ($("#alreadySent").is(":checked")) {
		sentFlag = $("#alreadySent").val();
	}

	var fruitBoxList = [];
	var tableData = $("#fruitTable tr");
	tableData.each(function(i) {
        var $elm = $(this);

        var boxName = $elm.find(".boxName").text();
        var regDate = $elm.find(".regDate").text();
        var sentDate = $elm.find(".sentDate").text();

        var tableObj = {
        		"boxName" : boxName,
        		"regDate" : regDate,
        		"sentDate" : sentDate
        		};
        fruitBoxList.push(tableObj);
	});

	bean["sentFlag"] = sentFlag;
	bean["fruitBoxList"] = fruitBoxList;

	$.ajax({
		type : "POST",
		async: true,
		contentType : "application/json",
		url : contextPath + "/checkSentDatePost",
		data : JSON.stringify(jsonRequestBean),
		dataType : 'json',
		success : function(data) {
			if (data.result === "NORMAL") {
				// 発送日更新
				updateSentDate();
			} else {
				alert("レスポンスエラー");
			}
		},
		error : function() {
			alert("Ajax通信エラー");
		}
	})
}
/**
 * 発送日更新
 * 発送日を入力された年月日で更新する
 */
function updateSentDate() {
	// 発送日生成
	var inputtedSentDateYear = $("#sentDateYear").val();	// 発送日-年
	var inputtedSentDateMonth = $("#sentDateMonth").val();	// 発送日-月
	var inputtedSentDateDay = $("#sentDateDay").val();		// 発送日-日
	var inputtedSentDate = inputtedSentDateYear + "年" + inputtedSentDateMonth + "月" + inputtedSentDateDay + "日"

	// 更新対象取得
	var boxName = $("input[name='select']:checkbox:checked").parent().parent().find("td.boxName").text();
	// 発送日生成
	$.each(objFruitBoxList, function(i, row) {
		if (boxName === row.boxName) {
			row.sentDate = inputtedSentDate;
			row.sentDateYear = inputtedSentDateYear;
			row.sentDateMonth = inputtedSentDateMonth;
			row.sentDateDay = inputtedSentDateDay;
		}
	});
	// formのフルーツリストにobjFruitBoxListを設定
	$("#fruitBoxList").val(JSON.stringify(objFruitBoxList));
	// フルーツテーブルレンダリング
	renderFruitTable();
}
/**
 * フルーツテーブルレンダリング
 */
function renderFruitTable() {
	// 最初の行を除くすべての表の行を削除する
	$("#fruitTable").find("tr:gt(0)").remove();
	var tempTr = $("#fruitTable tr:first").clone().end();
	$.each(objFruitBoxList, function(i, row) {
		var trAdd = tempTr.clone();
		trAdd.find("input[tyoe=checkbox]").val(i);
		if (row.newFlag) {
			trAdd.find("td.newFlag").text("○");
		} else {
			trAdd.find("td.newFlag").text("");
		}
		trAdd.find("td.boxName").text(row.boxName);
		trAdd.find("td.boxNo").text(row.boxNo);
		trAdd.find("td.regDate").text(row.regDate);
		trAdd.find("td.sentDate").text(row.sentDate);
		trAdd.css("display", "").appendTo("#fruitTable");
		// スクロールの設定
		if (i == 3) {
			$("#fruitInfoDiv").css({
				height : parseInt($("#fruitTable").outerHeight()),
				overflow : "auto"
			});
		}
	});

	// フルーツテーブル_選択押下イベント
	$("input[name='select']").click(function() {
		// 複数チェック抑止
		$("input[name='select']").prop('checked', false);
		$(this).prop('checked', true);
		// 登録日コピー
		copyRegDate();
	});
};
/**
 * @param value
 * @returns
 */
function replaceDoubleQuotes(target) {
	return target.replace(/\'/g, '\"');
}