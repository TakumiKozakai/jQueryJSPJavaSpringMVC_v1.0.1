<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>hello</title>
</head>
<body>
	<form:form id="submitForm" modelAttribute="form" action="${action}">
		<input type="hidden" id="fruitList" name="fruitList" value="${fruitList}" />

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
					<th width="100px">果物名</th>
					<th width="80px">管理番号</th>
					<th width="150px">登録日</th>
					<th width="50px">年</th>
					<th width="50px">月</th>
					<th width="50px">日</th>
				</tr>
			</table>
		</div>
		<div id="fruitInfoDiv" style="width: 600px;">
			<table id="fruitTable" border="1" style="border-collapse: collapse">
				<tr style="display: none;">
					<td width="50px"  align="center"><input type="checkbox" name="select" /></td>
					<td width="50px" class="newFlag" align="center" style="color: red;"></td>
					<td width="100px" class="fruitName"></td>
					<td width="80px" class="fruitNo"></td>
					<td width="150px" class="regDate"></td>
					<td width="50px" class="hdnRegDateYear"></td>
					<td width="50px" class="hdnRegDateMonth"></td>
					<td width="50px" class="hdnRegDateDay"></td>
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
			<input type="button" id="BTN_jadge" value="新規有無確認">
		</div>
		<br>
		<div>
			<span style="border-bottom: solid 1px;">登録日変更</span>
			<br>
			<form:input style="width: 30px;" id="inputRegDateYear" path="regDateYear" maxlength="4" />年
			<form:input style="width: 30px;" id="inputRegDateMonth" path="regDateMonth" maxlength="2" />月
			<form:input style="width: 30px;" id="inputRegDateDay" path="regDateDay" maxlength="2" />日
			<input type="button" id="BTN_updateRegDateGet" value="変更GET">
			<input type="button" id="BTN_updateRegDatePost" value="変更POST">
		</div>
		<br>
	</form:form>
	<footer>
		<script type="text/javascript"
			src="/demo/resources/js/jQuery-3.4.1.min.js"></script>
		<script type="text/javascript">
			var contextPath = "${pageContext.request.contextPath}";
		</script>
		<script type="text/javascript" src="/demo/resources/js/hello.js"></script>

	</footer>
</body>
</html>