// フルーツデータ
var objFruitData = [];

$(document).ready(function() {
	// 項目初期化
	init();
	// 追加ボタン押下イベント
	$("#BTN_addFruit").click(function() {
		// 追加
		addFruit()
	});
	// 判定ボタン押下イベント
	$("#BTN_jadge").click(function() {
		var newFlag;
		// 新規分有無チェック
		$.each(objFruitData, function(i, row) {
			if (row.newFlag) {
				newFlag = true;
				return;
			}
		});
		if (newFlag) {
			window.alert("新規分が存在しています。");
		} else {
			window.alert("新規分は存在していません。");
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
function init(){
	// フルーツリストをJSON形式に変換
	if ("" !== $("#fruitList").val()) {
		objFruitData = $.parseJSON(replaceDoubleQuotes($("#fruitList").val()));
	}
	// formのフルーツリストにobjFruitDataを設定
	$("#fruitList").val(JSON.stringify(objFruitData));
	// フルーツテーブルレンダリング
	renderFruitTable();
}
function addFruit(){
	// 操作日付生成
	today = new Date();
	var regDate =
		today.getFullYear()+ "年"
		+ (today.getMonth() + 1) + "月"
		+ today.getDate() + "日";

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
	objFruitData.push(fruitData);
	// formのフルーツリストにobjFruitDataを設定
	$("#fruitList").val(JSON.stringify(objFruitData));
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
	$($("input[name='select']:checkbox:checked").get())
			.each(function() {
						$("#inputRegDateYear").val(
								$(this).parent().parent().find("td.hdnRegDateYear").text());
						$("#inputRegDateMonth").val(
								$(this).parent().parent().find("td.hdnRegDateMonth").text());
						$("#inputRegDateDay").val(
								$(this).parent().parent().find("td.hdnRegDateDay").text());
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
//	requestBean = {
//			regDateYear : $("#inputRegDateYear").val(),
//			regDateMonth : $("#inputRegDateMonth").val(),
//			regDateDay : $("#inputRegDateDay").val()
//	}
	// Ajax
	$.ajax({
//		type : "GET",
		type : "POST",
		async : true,
		contentType : "application/json",
		url : contextPath + "/checkRegDatePost",
		data : {
			form : $("#submitForm").serialize()
//			requestStrJson : JSON.stringify(requestBean)
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
	var inputtedRegDate =
		inputtedRegDateYear + "年"
		+ inputtedRegDateMonth+ "月"
		+ inputtedRegDateDay + "日"

	// 変更対象判定用 番号取得
	var row = [];
	row = $("input[name='select']:checkbox:checked").get();
	var fruitNo = $(row).parent().parent().find("td.fruitNo").text();

	$.each(objFruitData, function(i, row) {
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

	// formのフルーツリストにobjFruitDataを設定
	$("#fruitList").val(JSON.stringify(objFruitData));
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
	$.each(objFruitData, function(i, row) {
		var trAdd = tempTr.clone();
		trAdd.find("input[tyoe=checkbox]").val(i);
		if (row.newFlag) {
			trAdd.find("td.newFlag").text("○");
		} else {
			trAdd.find("td.newFlag").text("");
		}
		trAdd.find("td.fruitName").text(row.fruitName);
		trAdd.find("td.fruitNo").text(row.fruitNo);
		trAdd.find("td.regDate").text(row.regDate);
		trAdd.find("td.hdnRegDateYear").text(row.regDateYear);
		trAdd.find("td.hdnRegDateMonth").text(row.regDateMonth);
		trAdd.find("td.hdnRegDateDay").text(row.regDateDay);
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