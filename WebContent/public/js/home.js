// フルーツデータ
var objFruitBoxList = [];

$(document).ready(function() {
	// 項目初期化
	init();
	// 追加ボタン押下イベント
	$("#BTN_addFruit").click(function() {
		// 追加
		addFruit()
	});
	// 新規有無確認ボタン押下イベント
	$("#BTN_checkNewFlag").click(function() {
		var isNew;
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
	});
	// 発送状態確認ボタン押下イベント
	$("#BTN_checkSendStatus").click(function() {
		var boxName;
		var fruitBox = [];
		var fruitList = [];
		var sendStatusFlag;

		// 選択された箱名を取得
		$($("input[name='select']:checkbox:checked").get()).each(function() {
			boxName = $(this).parent().parent().find("td.boxName").text();
		});

		// 選択された箱を格納
		$.each(objFruitBoxList, function(i, objFruitBox) {
			if (boxName === objFruitBox.boxName) {
				fruitBox.push(objFruitBox);
				return;
			}
		});

		// 選択された箱の果物リストを格納
		$.each(fruitBox, function(i, row) {
			fruitList.push(row.fruitList);
		});

		// 要素を抽出する
//		fruitBox = $.grep(objFruitBoxList, function(obj, idx) {
//			return (obj.boxName === boxName);
//		});

		// 「発送済」有無チェック
		$.each(fruitList, function(i, fruit) {
			// 発送済があればtrue
			if ("発送済" === fruit.sendStatusCd) {
				sendStatusFlag = true;
				return;
			}
		});

		if (sendStatusFlag) {
			window.alert("発送済があります。");
		} else {
			window.alert("発送済がありません。");
		}
	});
	// 登録日変更ボタン押下イベント(POST送信)
	$("#BTN_updateRegDateGet").click(function() {
		// 単項目チェック
		checkRegDateGet();
		// 登録日変更
		updateRegDate();
	});
	// 登録日変更ボタン押下イベント(POST送信)
	$("#BTN_updateRegDatePost").click(function() {
		// 単項目チェック
		checkRegDatePost();
		// 登録日変更
		updateRegDate();
	});
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

function addFruit() {
	// 操作日付生成
	today = new Date();
	var regDate = today.getFullYear() + "年" + (today.getMonth() + 1) + "月" + today.getDate() + "日";

	// 追加用フルーツデータ生成
	var fruitData = {
		newFlag : true,
		fruitName : $("#fruitName").val(),
		fruitNo : $("#fruitNo").val(),
		regDate : regDate,
		regDateYear : today.getFullYear(),
		regDateMonth : (today.getMonth() + 1),
		regDateDay : today.getDate()
	}

	// 生成したフルーツデータを格納
	objFruitBoxList.push(fruitData);
	// formのフルーツリストにobjFruitBoxListを設定
	$("#fruitBoxList").val(JSON.stringify(objFruitBoxList));
	// フルーツテーブルレンダリング
	renderFruitTable();
	// 入力値クリア
	$("#fruitName").val("");
	$("#fruitNo").val("");
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
 * 単項目チェック（登録日変更GET）
 */
function checkRegDateGet() {
	// 入力された登録日をController側でチェックする
	requestBean = {
		regDateYear : $("#inputRegDateYear").val(),
		regDateMonth : $("#inputRegDateMonth").val(),
		regDateDay : $("#inputRegDateDay").val()
	}
	// Ajax
	$.ajax({
		type : "GET",
		async : true,
		contentType : "application/json",
		url : contextPath + "/checkRegDateGet",
		data : {
			requestStrJson : JSON.stringify(requestBean)
		},
		dataType : 'json',
		timeout : 70000,
		success : function(data) {
			if (data.result === "success") {
				// 登録日変更
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
 * 単項目チェック（登録日変更POST）
 */
function checkRegDatePost() {
	// 入力された登録日をController側でチェックする
	// requestBean = {
	// regDateYear : $("#inputRegDateYear").val(),
	// regDateMonth : $("#inputRegDateMonth").val(),
	// regDateDay : $("#inputRegDateDay").val()
	// }
	// Ajax
	$.ajax({
		// type : "GET",
		type : "POST",
		async : true,
		contentType : "application/json",
		url : contextPath + "/checkRegDatePost",
		data : {
			form : $("#submitForm").serialize()
		// requestStrJson : JSON.stringify(requestBean)
		},
		dataType : 'json',
		timeout : 70000,
		success : function(data) {
			if (data.result === "success") {
				// 登録日変更
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
 * 登録日変更
 */
function updateRegDate() {
	// 登録日を入力された年月日で変更する
	// 新規分のもののみ変更する
	// 番号が同一の場合は、同一分全て変更する

	// 日付生成
	// 登録日-年
	var inputtedRegDateYear = $("#inputRegDateYear").val();
	// 登録日-月
	var inputtedRegDateMonth = $("#inputRegDateMonth").val();
	// 登録日-日
	var inputtedRegDateDay = $("#inputRegDateDay").val();
	// 登録日
	var inputtedRegDate = inputtedRegDateYear + "年" + inputtedRegDateMonth + "月" + inputtedRegDateDay + "日"

	// 変更対象判定用 番号取得
	var row = [];
	row = $("input[name='select']:checkbox:checked").get();
	var fruitNo = $(row).parent().parent().find("td.fruitNo").text();

	$.each(objFruitBoxList, function(i, row) {
		// 新規分でない場合、スキップ
		if (!row.newFlag) {
			return;
		}
		// 番号が同一の場合、日付変更
		if (fruitNo === row.fruitNo) {
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