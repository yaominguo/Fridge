import java.util.*;

public class DotComBust {
  // 声明并初始化变量
  private GameHelper helper = new GameHelper();
  private ArrayList<DotCom> dotComsList = new ArrayList<DotCom>();
  private int numOfGuesses = 0;

  private void setUpGame() {
    // 创建3个DotCom对象并指派名称并置入ArrayList
    DotCom one = new DotCom();
    one.setName("Pets.com");
    DotCom two = new DotCom();
    two.setName("eToys.com");
    DotCom three = new DotCom();
    three.setName("Go2.com");
    dotComsList.add(one);
    dotComsList.add(two);
    dotComsList.add(three);

    // 列出简短提示
    System.out.println("You goal is to sink three dot coms.");
    System.out.println("Pets.com, eToys.com, Go2.com");
    System.out.println("Try to sink them all in the fewest number of guesses");

    // 对list中的每个DotCom轮流进行操作
    for (DotCom dotComToSet : dotComsList) {
      // 获取DotCom的位置
      ArrayList<String> newLocation = helper.placeDotCom(3);
      // 调用set方法来指派刚取得的位置
      dotComToSet.setLocationCells(newLocation);
    }
  }

  private void startPlaying() {
    // 判断DotCom的list是否为空
    while (!dotComsList.isEmpty()) {
      // 取得玩家输入
      String userGuess = helper.getUserInput("Enter a guess: ");
      // 调用check方法
      checkUserGuess(userGuess);
    }
    // 调用finish方法
    finishGame();
  }

  private void checkUserGuess(String userGuess) {
    numOfGuesses++; //递增玩家的猜测次数
    String result = "miss"; //先假设为miss

    // 对list中的每个DotCom调用check方法
    for (DotCom dotComToTest : dotComsList) {
      // 取得猜测结果
      result = dotComToTest.checkYourself(userGuess);
      if (result.equals("hit")) {
        break; //提前跳出循环
      }
      if (result.equals("kill")) {
        // 将被击沉的移除
        dotComsList.remove(dotComToTest);
        break;
      }
    }
    System.out.println(result);
  }

  private void finishGame() {
    // 列出玩家成绩
    System.out.println("All Dot Coms are dead! Your stock is now worthless.");
    if (numOfGuesses <= 18) {
      System.out.println("It only took you " + numOfGuesses + " guesses.");
      System.out.println(" You got out befor your options sank.");
    } else {
      System.out.println("Took you lone enough. " + numOfGuesses + " guesses.");
      System.out.println("Fish are dancing with your options.");
    }
  }

  public static void main (String[] args) {
    DotComBust game = new DotComBust();
    game.setUpGame(); //创建游戏对象
    game.startPlaying(); //启动游戏的主循环
  }
}