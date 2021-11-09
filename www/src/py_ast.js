;(function($B){
$B.ast_classes = {
Add:'',
And:'',
AnnAssign:'target,annotation,value,simple',
Assert:'test,msg',
Assign:'targets,value,type_comment',
AsyncFor:'target,iter,body,orelse,type_comment',
AsyncFunctionDef:'name,args,body,decorator_list,returns,type_comment',
AsyncWith:'items,body,type_comment',
Attribute:'value,attr,ctx',
AugAssign:'target,op,value',
Await:'value',
BinOp:'left,op,right',
BitAnd:'',
BitOr:'',
BitXor:'',
BoolOp:'op,values',
Break:'',
Call:'func,args,keywords',
ClassDef:'name,bases,keywords,body,decorator_list',
Compare:'left,ops,comparators',
Constant:'value,kind',
Continue:'',
Del:'',
Delete:'targets',
Dict:'keys,values',
DictComp:'key,value,generators',
Div:'',
Eq:'',
ExceptHandler:'type,name,body',
Expr:'value',
Expression:'body',
FloorDiv:'',
For:'target,iter,body,orelse,type_comment',
FormattedValue:'value,conversion,format_spec',
FunctionDef:'name,args,body,decorator_list,returns,type_comment',
FunctionType:'argtypes,returns',
GeneratorExp:'elt,generators',
Global:'names',
Gt:'',
GtE:'',
If:'test,body,orelse',
IfExp:'test,body,orelse',
Import:'names',
ImportFrom:'module,names,level',
In:'',
Interactive:'body',
Invert:'',
Is:'',
IsNot:'',
JoinedStr:'values',
LShift:'',
Lambda:'args,body',
List:'elts,ctx',
ListComp:'elt,generators',
Load:'',
Lt:'',
LtE:'',
MatMult:'',
Match:'subject,cases',
MatchAs:'pattern,name',
MatchClass:'cls,patterns,kwd_attrs,kwd_patterns',
MatchMapping:'keys,patterns,rest',
MatchOr:'patterns',
MatchSequence:'patterns',
MatchSingleton:'value',
MatchStar:'name',
MatchValue:'value',
Mod:'',
Module:'body,type_ignores',
Mult:'',
Name:'id,ctx',
NamedExpr:'target,value',
Nonlocal:'names',
Not:'',
NotEq:'',
NotIn:'',
Or:'',
Pass:'',
Pow:'',
RShift:'',
Raise:'exc,cause',
Return:'value',
Set:'elts',
SetComp:'elt,generators',
Slice:'lower,upper,step',
Starred:'value,ctx',
Store:'',
Sub:'',
Subscript:'value,slice,ctx',
Try:'body,handlers,orelse,finalbody',
Tuple:'elts,ctx',
TypeIgnore:'lineno,tag',
UAdd:'',
USub:'',
UnaryOp:'op,operand',
While:'test,body,orelse',
With:'items,body,type_comment',
Yield:'value',
YieldFrom:'value',
alias:'name,asname',
arg:'arg,annotation,type_comment',
arguments:'posonlyargs,args,vararg,kwonlyargs,kw_defaults,kwarg,defaults',
boolop:['And','Or'],
cmpop:['Eq','NotEq','Lt','LtE','Gt','GtE','Is','IsNot','In','NotIn'],
comprehension:'target,iter,ifs,is_async',
excepthandler:['ExceptHandler'],
expr:['BoolOp','NamedExpr','BinOp','UnaryOp','Lambda','IfExp','Dict','Set','ListComp','SetComp','DictComp','GeneratorExp','Await','Yield','YieldFrom','Compare','Call','FormattedValue','JoinedStr','Constant','Attribute','Subscript','Starred','Name','List','Tuple','Slice'],
expr_context:['Load','Store','Del'],
keyword:'arg,value',
match_case:'pattern,guard,body',
mod:['Module','Interactive','Expression','FunctionType'],
operator:['Add','Sub','Mult','MatMult','Div','Mod','Pow','LShift','RShift','BitOr','BitXor','BitAnd','FloorDiv'],
pattern:['MatchValue','MatchSingleton','MatchSequence','MatchMapping','MatchClass','MatchStar','MatchAs','MatchOr'],
stmt:['FunctionDef','AsyncFunctionDef','ClassDef','Return','Delete','Assign','AugAssign','AnnAssign','For','AsyncFor','While','If','With','AsyncWith','Match','Raise','Try','Assert','Import','ImportFrom','Global','Nonlocal','Expr','Pass','Break','Continue'],
type_ignore:['TypeIgnore'],
unaryop:['Invert','Not','UAdd','USub'],
withitem:'context_expr,optional_vars'
}

// binary operator tokens
var binary_ops = {
    '+': 'Add', '-': 'Sub', '*': 'Mult', '/': 'Div', '//': 'FloorDiv',
    '%': 'Mod', '**': 'Pow', '<<': 'LShift', '>>': 'RShift', '|': 'BitOr',
    '^': 'BitXor', '&': 'BitAnd', '@': 'MatMult'
    }

// boolean operator tokens
var boolean_ops = {'and': 'And', 'or': 'Or'}

// comparison operator tokens
var comparison_ops = {
    '==': 'Eq', '!=': 'NotEq', '<': 'Lt', '<=': 'LtE', '>': 'Gt', '>=': 'GtE',
    'is': 'Is', 'is_not': 'IsNot', 'in': 'In', 'not_in': 'NotIn'}

var unary_ops = {unary_inv: 'Invert', unary_pos: 'UAdd', unary_neg: 'USub'}

var op_types = [binary_ops, boolean_ops, comparison_ops, unary_ops]

var _b_ = $B.builtins

function class_wrapper(ast_class){
    var klass = {
        __class__: _b_.type,
        __mro__: [$B.AST, _b_.object],
        __repr__: function(self){
            return `<ast.${ast_class.$name} object>`
        },
        $infos:{
            __name__ : ast_class.$name
        },
        $is_class: true
    }
    $B.set_func_names(klass)
    return klass
}

var ast = $B.ast = {}
for(var kl in $B.ast_classes){
    var args = $B.ast_classes[kl],
        js = ''
    if(typeof args == "string"){
        js = `ast.${kl} = function(${args}){
`
        if(args.length > 0){
            for(var arg of args.split(',')){
                js += ` this.${arg} = ${arg}
`
            }
        }
        js += `  this.__class__ = class_wrapper(ast.${kl})
`
        js += '}'
    }else{
        js = `ast.${kl} = [${args.map(x => 'ast.' + x).join(',')}]
`
    }
    js += `
ast.${kl}.$name = "${kl}"
`
    eval(js)
}
// Map operators to ast type (BinOp, etc.) and name (Add, etc.)
var op2ast_class = $B.op2ast_class = {},
    ast_types = [ast.BinOp, ast.BoolOp, ast.Compare, ast.UnaryOp]
for(var i = 0; i < 4; i++){
    for(var op in op_types[i]){
        op2ast_class[op] = [ast_types[i], ast[op_types[i][op]]]
    }
}

})(__BRYTHON__)
