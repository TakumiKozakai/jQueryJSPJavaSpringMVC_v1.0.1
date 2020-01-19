<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>home</title>
</head>
<body>
	<form:form id="submitForm" modelAttribute="form" action="${action}">
		<input type="hidden" id="fruitBoxList" name="fruitBoxList" value="${fruitBoxList}" />

		<h1>${appName}</h1>
		<div>
			<p>${message}</p>
			<p>${now}</p>
		</div>
		<div></div>
		<div style="width: 600px;">
			<table border="1" style="border-collapse: collapse;">
				<tr>
					<th width="50px">選択</th>
					<th width="50px">新規</th>
					<th width="100px">箱名</th>
					<th width="100px">箱番号</th>
					<th width="150px">登録日</th>
					<th width="150px">送付日</th>
				</tr>
			</table>
		</div>
		<div id="fruitInfoDiv" style="width: 600px;">
			<table id="fruitTable" border="1" style="border-collapse: collapse">
				<tr style="display: none;">
					<td width="50px" align="center"><input type="checkbox" name="select"></td>
					<td width="50px" class="newFlag" align="center" style="color: red;"></td>
					<td width="100px" class="boxName"></td>
					<td width="100px" class="boxNo"></td>
					<td width="150px" class="regDate"></td>
					<td width="150px" class="sentDate"></td>
				</tr>
			</table>
		</div>
		<br>
		<div>
		<table>
			<tr>
				<td><span style="border-bottom: solid 1px;">フルーツ追加</span></td>
			</tr>
			<tr>
				<td>果物名　：<input type="text" id="fruitName"></td>
			</tr>
			<tr>
				<td>管理番号：<input type="text" id="fruitNo"></td>
			</tr>
			<tr>
				<td><input type="button" id="BTN_addFruit" value="追加"></td>
			</tr>
			</table>
		</div>
		<br>
		<div>
			<input type="button" id="BTN_checkNewFlag" value="新規有無確認">
		</div>
		<div>
			<input type="button" id="BTN_checkSendStatus" value="発送状態確認">
		</div>
		<br>
		<div>
			<span style="border-bottom: solid 1px;">登録日更新</span>
			<br>
			<form:input style="width: 30px;" id="regDateYear" path="regDateYear" maxlength="4" value="2020" />年
			<form:input style="width: 30px;" id="regDateMonth" path="regDateMonth" maxlength="2" value="01" />月
			<form:input style="width: 30px;" id="regDateDay" path="regDateDay" maxlength="2" value="20" />日
			<input type="button" id="BTN_updateRegDateGet" value="変更GET">
		</div>
		<br>
		<div>
		<table>
			<tr>
				<td><span style="border-bottom: solid 1px;">発送日更新</span></td>
			</tr>
			<tr>
				<td>
					<form:radiobutton id="yetSent" path="yetSent" label="未発送" value="01" />
					<form:radiobutton id="alreadySent" path="alreadySent" label="発送済" value="02" />
				</td>
			</tr>
			<tr>
				<td>
					<form:input style="width: 30px;" id="sentDateYear" path="sentDateYear" maxlength="4" value="2020" />年
					<form:input style="width: 30px;" id="sentDateMonth" path="sentDateMonth" maxlength="2" value="01" />月
					<form:input style="width: 30px;" id="sentDateDay" path="sentDateDay" maxlength="2" value="20" />日
					<input type="button" id="BTN_updateSentDatePost" value="変更POST">
				</td>
			</tr>
		</table>
		</div>
		<br>
	</form:form>
	<footer>
		<script type="text/javascript" src="/demo/resources/js/jQuery-3.4.1.min.js"></script>
		<script type="text/javascript">
			var contextPath = "${pageContext.request.contextPath}";
		</script>
		<script type="text/javascript" src="/demo/resources/js/home.js"></script>
	</footer>
</body>
</html>