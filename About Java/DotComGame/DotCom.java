import java.util.*;

public class DotCom {
  private ArrayList<String> locationCells; //保存位置的ArrayList
  private String name; //DotCom的名称
  
  // 更新DotCom的set方法
  public void setLocationCells(ArrayList<String> loc) {
    locationCells = loc;
  }

  // 设置DotCom名称的方法
  public void setName(String n) {
    name = n;
  }

  public String checkYourself(String userInput) {
    String result = "miss";
    int index = locationCells.indexOf(userInput);
    // 如果猜中了会返回下标，否则返回-1
    if(index >= 0) {
      locationCells.remove(index); //删除呗猜中的元素

      if(locationCells.isEmpty()) { //数组为空则判断为击沉
        result = "kill";
        System.out.println("Ouch! You sank " + name + " :( ");
      } else {
        result = "hit";
      }
    }
    // 返回状态
    return result;
  }
}